# Auditoría técnica completa — Onni

**Fecha:** 2026-05-03  
**Alcance:** revisión estructural, configuración, build/lint, riesgos operativos y seguridad básica de configuración.

## 1) Resumen ejecutivo

Estado general: **operativo parcial**.

Hallazgos críticos/altos:
1. **`npm run build` falla** al intentar compilar la ruta `/api/checkout/sessions` por falta de configuración de autenticación/API key en tiempo de build.
2. **`npm run lint` está roto** con la configuración actual (`next lint` no funciona como se espera en este setup; reporta `Invalid project directory ... /lint`).
3. **Documentación operativa desactualizada** en `AGENTS.md` (indica repo vacío sin runtime/deps, pero el proyecto ya es una app Next.js con TypeScript y APIs).

Hallazgo medio:
4. **Uso de `middleware.ts` con advertencia deprecada** en Next.js 16 (migración recomendada a `proxy`).

## 2) Evidencia de ejecución

Comandos ejecutados:
- `npm install` ✅ (dependencias resueltas)
- `npm run lint` ❌ (script/configuración inválida)
- `npm run build` ❌ (error en etapa de page data por credenciales faltantes)

Errores relevantes observados:
- Lint: `Invalid project directory provided, no such directory: /workspace/onni/lint`
- Build: `Error: Neither apiKey nor config.authenticator provided`

## 3) Hallazgos detallados

### H-01 (Alta) — Build no reproducible en CI/CD sin secretos
- **Impacto:** bloquea despliegues y validación de integridad del release.
- **Síntoma:** build rompe en `/api/checkout/sessions` al evaluar módulo que exige autenticación.
- **Riesgo asociado:** releases fallidos y hotfixes urgentes en producción.
- **Recomendación:**
  - Evitar inicialización estricta de SDKs externos en import-time.
  - Mover inicialización a ejecución bajo handler con guardas de variables de entorno.
  - Definir `.env.example` con variables requeridas.

### H-02 (Alta) — Lint no funcional
- **Impacto:** no hay control de calidad estático consistente.
- **Síntoma:** script `lint` no ejecuta revisión real del código.
- **Recomendación:**
  - Ajustar script a comando compatible con Next 16 (por ejemplo ESLint directo).
  - Agregar config explícita de ESLint y script de CI.

### H-03 (Media) — Convención `middleware` deprecada
- **Impacto:** deuda técnica y potencial ruptura futura.
- **Recomendación:** planificar migración a `proxy` según guía de Next.

### H-04 (Media) — Documentación operativa inconsistente
- **Impacto:** onboarding y operación confusa; riesgo de errores en mantenimiento.
- **Recomendación:** actualizar AGENTS/README con instalación, ejecución, build, lint y variables mínimas.

## 4) Checklist de remediación priorizada

### Prioridad P0 (hoy)
- [ ] Corregir inicialización de servicios externos para que build no requiera secretos en import-time.
- [ ] Arreglar script de lint y validar que corre local/CI.

### Prioridad P1 (esta semana)
- [ ] Publicar `.env.example` con variables obligatorias y opcionales.
- [ ] Actualizar documentación de operación y troubleshooting.

### Prioridad P2 (próximo sprint)
- [ ] Migrar `middleware` → `proxy`.
- [ ] Incorporar pipeline CI mínimo: install + lint + build.

## 5) Veredicto

**No recomendado para lanzamiento inmediato** hasta resolver H-01 y H-02.

Con esas dos correcciones, el proyecto quedaría en una base razonable para seguir endureciendo calidad y operación.
