# Roadmap ONNI — Identidad + Conversión (sin romper producción)

Fecha: 2026-05-03

## Objetivo
Mejorar conversión tomando aprendizajes de referentes de ecommerce de skincare, **sin perder la identidad ONNI** ni introducir regresiones en checkout/operación.

---

## Principios no negociables de marca ONNI
1. Tono cercano, educativo y tropical (Caribe-first).
2. Prioridad en claridad para tipos de piel en clima húmedo/cálido.
3. No copiar UI de terceros 1:1; adaptar patrones a voz y propuesta ONNI.
4. Toda mejora de conversión debe mantener confianza (envío, pagos, políticas).

---

## Plan por fases

## Fase 1 (Quick wins, 3–5 días)
### 1) Product cards orientadas a conversión
- Mostrar ahorro/discount badge cuando aplique.
- CTA principal visible en mobile sin scroll adicional.
- Etiquetas de beneficio rápido (ej. "Manchas", "Hidratación", "Sensibilidad").

**Archivos objetivo**
- `components/product/ProductCard.tsx`
- `components/ProductCard.tsx`

### 2) PLP con orden útil por defecto
- Default sort: "Más vendidos".
- Filtros mínimos: categoría, tipo de piel, activo principal.

**Archivos objetivo**
- `app/products/page.tsx`
- `lib/products.ts`

### 3) Mensajes de confianza en checkout
- Copys de envío y tiempos más visibles.
- Reafirmar seguridad de pago y política de cambios/devoluciones.

**Archivos objetivo**
- `app/checkout/CheckoutView.tsx`

---

## Fase 2 (Impacto medio, 1–2 semanas)
### 4) PDP con bloque de decisión arriba del fold
- Beneficio principal + para quién + cómo usar + frecuencia.
- "No mezclar con" / "Combina bien con" para reducir fricción.

**Archivos objetivo**
- `app/products/[slug]/ProductDetailView.tsx`
- `components/seo/ProductJsonLd.tsx`

### 5) Bundles por rutina tropical
- Paquetes por objetivo (manchas, barrera, acné, glow).
- Cross-sell contextual en PDP y carrito.

**Archivos objetivo**
- `lib/products.ts`
- `components/CartSidebar.tsx`

---

## Fase 3 (Escala, 2–4 semanas)
### 6) Retención post-compra
- Flujo email/WhatsApp por hitos (confirmación, uso, recompra).
- Segmentación por tipo de piel y problema principal.

### 7) Medición y experimentación
- Métricas: ATC rate, checkout completion, AOV, CVR mobile/desktop.
- Experimentos A/B sobre hero, CTA PDP y orden inicial de PLP.

---

## Checklist anti-ruptura (obligatorio antes de merge)
1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm run build`
5. Smoke test manual:
   - Home carga
   - PLP filtra y ordena
   - PDP agrega al carrito
   - Checkout crea sesión
   - Redirect success/pending funciona

---

## Guardrails técnicos
- No introducir inicialización de SDKs externos en import-time.
- Mantener rutas API tolerantes a configuración incompleta en entornos no productivos.
- Evitar cambios de contratos de datos sin migración explícita.
- Mantener PRs pequeños (1 objetivo por PR) para rollback rápido.
