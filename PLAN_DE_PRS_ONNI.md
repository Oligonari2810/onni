# Plan de PRs ONNI

Fecha: 2026-05-05

## ¿Por qué PR vamos?

Vamos por el **PR 1 de estabilización operativa**: la base técnica ya compila, tiene CI mínimo, validadores, checkout/webhook más tolerantes, `/api/health` y documentación de pendientes.

Este PR no debe considerarse “producción final”; es el PR que deja claro el estado real y ordena el trabajo restante.

## ¿Cuántos PRs quedan?

Quedan **6 PRs recomendados** antes de tratar ONNI como producción estable para ventas reales.

| Orden | PR | Objetivo | Bloquea producción |
| --- | --- | --- | --- |
| Actual | PR 1 — Base + diagnóstico operativo | CI mínimo, build estable, healthcheck, docs de pendientes y variables. | Sí, en curso |
| Siguiente | PR 2 — Supabase schema, RLS y admin seguro | Migraciones versionadas, tablas/columnas confirmadas, policies RLS y operaciones admin protegidas. | Sí |
| Después | PR 3 — Stripe real e idempotencia | Probar checkout/webhook en modo test, evitar pedidos duplicados, manejar fallos/reintentos. | Sí |
| Después | PR 4 — QA real: ESLint + Playwright en CI | Instalar/configurar ESLint real, fijar Playwright como dev dependency y correr E2E críticos en CI. | Sí |
| Después | PR 5 — Observabilidad y emails transaccionales | Alertas/logs seguros para checkout/webhook/emails y plantillas confiables de Resend. | No, pero recomendado antes de escalar |
| Después | PR 6 — Tracking de conversión | GA4/Meta events: view_item, add_to_cart, begin_checkout, purchase y funnel por dispositivo/país. | No, pero necesario para marketing |
| Después | PR 7 — Conversión storefront + post-compra | PDP/PLP más fuertes, reviews, cross-sell, WhatsApp/email post-compra y recompra. | No, crecimiento |

## Resumen ejecutivo

- **Estamos en:** PR 1 de 7.
- **Quedan:** 6 PRs.
- **Quedan 3 PRs críticos antes de ventas reales:** PR 2, PR 3 y PR 4.
- **Quedan 3 PRs de operación/crecimiento:** PR 5, PR 6 y PR 7.

## Criterio para decir “listo para producción”

ONNI puede considerarse listo para operar ventas reales cuando estén completados, como mínimo:

1. PR 2 — Supabase/RLS/admin seguro.
2. PR 3 — Stripe probado con idempotencia.
3. PR 4 — QA real en CI con lint y E2E ejecutándose sin depender de descargas bloqueadas.

Los PRs 5–7 pueden ir después del lanzamiento inicial, pero son importantes para operar, medir y crecer sin perder control.
