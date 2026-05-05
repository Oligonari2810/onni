# Estado y pendientes ONNI

Fecha: 2026-05-05

## Estado actual

La base técnica ya está en mejor posición que al inicio del último PR:

- `npm run typecheck` pasa.
- `npm run check:catalog` pasa.
- `npm run check:assets` pasa.
- `npm run build` pasa sin requerir secretos reales durante la compilación.
- Existe CI mínimo, validadores, ruta `/api/health`, tests E2E base y flujo de checkout Stripe más tolerante a configuración incompleta.

## Qué falta antes de considerarlo listo para producción

### P0 — Antes de operar ventas reales

1. **Configurar secretos reales por ambiente**
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY` y `RESEND_FROM` si se enviarán emails transaccionales.

2. **Validar Stripe end-to-end con eventos reales**
   - Crear sesión de checkout en modo test.
   - Confirmar que `checkout.session.completed` inserta el pedido una sola vez.
   - Confirmar que `payment_intent.payment_failed` marca el pedido correctamente.
   - Revisar idempotencia del webhook para evitar pedidos duplicados si Stripe reintenta eventos.

3. **Asegurar el modelo de datos de Supabase**
   - Confirmar tablas `orders`, `admin_users` e `inquiries`.
   - Confirmar columnas usadas por checkout, webhook y admin.
   - Confirmar RLS/policies para que el panel admin no exponga datos a usuarios no autorizados.
   - Agregar migraciones versionadas si todavía no existen.

4. **Proteger el panel admin en servidor**
   - Hoy el login y las consultas admin dependen principalmente del cliente Supabase.
   - Falta endurecer con server-side checks, cookies/session validation y/o rutas API protegidas para operaciones sensibles.

### P1 — Calidad y operación

5. **Agregar lint real**
   - El script `lint` actualmente ejecuta `typecheck`, por lo que no detecta reglas de estilo, hooks o accesibilidad.
   - Falta agregar ESLint compatible con Next.js 16 cuando el registry permita instalar dependencias.
   - Intenté instalar ESLint, pero el registry respondió `403 Forbidden`; queda pendiente hacerlo en un entorno con acceso a npm.

6. **Mejorar observabilidad**
   - Registrar errores de checkout/webhooks con contexto seguro.
   - Agregar alertas para fallos de webhook, emails y creación de pedidos.
   - Usar `/api/health?strict=1` para readiness y `/api/health` para liveness.

7. **Completar pruebas E2E críticas**
   - Agregar `@playwright/test`/Playwright como dependencia de desarrollo o preinstalarlo en CI; hoy `npm run test:e2e` depende de `npx` y falla si el registry está bloqueado.
   - Checkout Stripe mockeado.
   - Flujo manual Nequi/transferencia.
   - Login/admin orders.
   - Smoke mobile para home, PLP, PDP, carrito y checkout.

### P2 — Conversión y crecimiento

8. **Tracking de conversión**
   - Eventos GA4/Meta: view_item, add_to_cart, begin_checkout, purchase.
   - Funnel por dispositivo y país.
   - UTM/campaign attribution.

9. **Mejorar PDP/PLP**
   - Filtros por tipo de piel, preocupación y activo principal.
   - Bloques de “cómo usar”, “combina con” y “no mezclar con”.
   - Reviews/testimonios verificables.

10. **Automatización post-compra**
    - Email/WhatsApp de confirmación, preparación, envío y educación de uso.
    - Recordatorios de recompra por producto.

## Veredicto

No falta una sola cosa: faltan principalmente **secretos reales, validación Stripe/Supabase en ambiente real, hardening del admin y lint real**. La app ya compila y tiene base de CI, pero todavía necesita cerrar esos puntos antes de tratarla como producción estable.
