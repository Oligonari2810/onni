# Informe de Auditoría - ONNI

Fecha: 2026-06-19
Autor: Auditoría automática (asistente)

**Resumen ejecutivo**
- Estado general: repositorio compilable y ejecutable tras reinstalación de dependencias y pequeñas correcciones.
- Acciones realizadas: búsqueda estática, `npm run typecheck`, reinstalación de dependencias, `npm audit`, arreglos de logging sensible en APIs, sincronización de `apiVersion` de Stripe, rebuild exitoso.
- Riesgos críticos: dependencias con vulnerabilidades moderadas (principalmente `postcss`/`next`) que requieren actualización cuidadosa.

**Cambios aplicados (rápidos, no invasivos)**
- Reducción de logs sensibles en producción en:
  - [app/api/inquiries/route.ts](app/api/inquiries/route.ts#L1-L200)
  - [app/api/checkout/sessions/route.ts](app/api/checkout/sessions/route.ts#L1-L200)
  - [app/api/webhooks/stripe/route.ts](app/api/webhooks/stripe/route.ts#L1-L200)
- Actualización de la versión de la API de Stripe para coincidir con los tipos TypeScript en:
  - [app/api/checkout/sessions/route.ts](app/api/checkout/sessions/route.ts#L1-L50)
  - [app/api/webhooks/stripe/route.ts](app/api/webhooks/stripe/route.ts#L1-L30)

**Hallazgos técnicos**
1) Build inicial: fallo por binding nativo de `@tailwindcss/oxide`.
   - Acción: reinstalación de dependencias (eliminando `node_modules` y `package-lock.json`) solucionó el problema.
2) Dependencias vulnerables (resultado `npm audit` después de fixes automáticos):
   - `postcss` (moderate) — afecta `next`.
   - `next` (moderate) — varias advisories relacionadas con App Router, DoS y XSS en rangos <16.2.5.
   - Nota: `npm audit fix --force` propone cambios mayores (posible breaking change). Recomendación: actualizar de forma controlada.
3) Logs y exposición de datos:
   - `app/api/inquiries/route.ts` registraba `rawBody` y detalles de validación — ahora condicionado a entornos no productivos.
   - `app/api/checkout/sessions/route.ts` y `app/api/webhooks/stripe/route.ts` reducen el volcado de objetos de error en producción.
4) Webhooks Stripe:
   - Verificación de firma implementada correctamente usando `stripe.webhooks.constructEvent`.
   - Verificar que `STRIPE_WEBHOOK_SECRET` esté guardado y rotado cuando corresponda.
5) Manejo de pagos / DB:
   - Inserciones en `orders` (Supabase) y envíos de email (Resend) desde el webhook. Confirmar que las respuestas externas sean tratadas y que fallos no provoquen duplicados.
6) Variables de entorno públicas/privadas:
   - Se usa `NEXT_PUBLIC_SUPABASE_URL` para detectar configuración de Supabase — recordar que cualquier `NEXT_PUBLIC_` es visible en cliente. No pongas claves privadas con ese prefijo.

**Recomendaciones priorizadas (alto → bajo)**
- Alto
  - Actualizar `next` y `postcss` a versiones que corrijan las advisories (probar en una rama y revisar breaking changes). Considerar esperar a releases menores compatibles o aplicar mitigaciones si la actualización es disruptiva.
  - Asegurar rotación y almacenamiento de `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` en un gestor de secretos (Vercel Secrets / environment variables en CI/CD). No exponer en repositorio.
  - Implementar un logger con niveles (p.e. `pino`, `winston` o `bun`) y redacción (masking) de campos sensibles.
- Medium
  - Revisar tamaño y contenido de `metadata` enviado a Stripe (serializado). Limitar campos y validar/escapar para evitar inyección o exceso de datos.
  - Añadir monotonización y deduplicación en la inserción de pedidos desde webhooks (idempotencia basada en `stripe_session_id` o `payment_intent`).
  - Añadir tests e2e para flujos de checkout y webhooks (Playwright ya configurado en repo).
- Bajo
  - Configurar monitoring/alertas (Sentry/Logflare) para errores en producción.
  - Cifrar backups de la DB y revisar políticas de retención de datos.

**Acciones sugeridas (paso a paso)**
1. Crear una rama para actualizar dependencias: `git checkout -b fix/deps-audit`.
2. Probar actualizaciones controladas:

```bash
# opcional: limpiar e instalar
rm -rf node_modules package-lock.json
npm i
# ejecuciones de verificación
npm run typecheck
npm run build
npm audit
```

3. Para aplicar fixes automáticos (riesgo de breaking):

```bash
npm audit fix --force
# luego ejecutar tests y build
npm run build
npm run typecheck
```

4. Aplicar revisiones de código y abrir PR con:
   - Cambios en logging (ya aplicados en esta rama).
   - Cambios de `apiVersion` de Stripe (ya aplicados).
   - Notas en la descripción del PR sobre vulnerabilidades y pasos para QA.

5. Rotación de claves y verificación de entorno en staging antes de producción.

**Comandos útiles**
- Reinstalar dependencias y build:

```bash
rm -rf node_modules package-lock.json
npm i
npm run build
```

- Ejecutar auditoría:

```bash
npm audit
npm audit fix
# o para cambios mayores (usar con precaución)
npm audit fix --force
```

- Ejecutar typecheck y tests:

```bash
npm run typecheck
npm run test:e2e
```

**Siguientes pasos propuestos (puedo ejecutar)**
- (A) Crear PR con cambios actuales (logs + apiVersion) y descripción técnica.
- (B) Abrir rama y aplicar `npm audit fix --force` y ejecutar pruebas (riesgo de breaking).
- (C) Preparar un plan de actualización de `next` que incluya pruebas E2E y revisión manual de breaking changes.
- (D) Generar checklist de despliegue seguro (rotación secretos, backups, monitorización).

Si quieres, procedo con la opción (A) y creo el PR con los cambios realizados hasta ahora.

---
Archivo generado: `REPORT_AUDITORIA.md`
