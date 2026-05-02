# 🚨 URGENTE: Fix para Deploy Roto en Vercel

**Fecha:** 1 de mayo de 2026  
**Problema:** La web en producción tiene errores de fetch en páginas de producto

---

## 🔍 Diagnóstico

Los errores en consola:
```
Fetch failed loading: GET "https://www.onnicosmetics.com/products/[slug]?_rsc=..."
Fetch failed loading: GET "https://www.onnicosmetics.com/.well-known/vercel/jwe"
```

**Causa probable:** Build de Vercel está fallando o incompleto.

---

## ✅ SOLUCIÓN PASO A PASO

### **Opción 1: Redeploy manual desde Vercel Dashboard** (RECOMENDADO)

1. **Entrá a Vercel:**
   - URL: https://vercel.com/dashboard
   - Login con la cuenta del proyecto

2. **Buscá el proyecto `onni`:**
   - Debería estar en `oligonari2810s-projects` o similar

3. **Verificá el último deploy:**
   - ¿Está en ✅ verde (success) o ❌ rojo (failed)?
   - Si está rojo → clickeá y revisá los logs de error

4. **Forzá un redeploy limpio:**
   - Click en el deploy más reciente
   - Click en los 3 puntitos `⋮` (arriba a la derecha)
   - Seleccioná **"Redeploy"**
   - ✅ Marcá la casilla **"Clear build cache"**
   - Click en **"Redeploy"**

5. **Esperá 3-5 minutos** y verificá en https://www.onnicosmetics.com/

---

### **Opción 2: Verificar Variables de Entorno en Vercel**

Si el deploy sigue fallando, faltan variables de entorno:

1. **En Vercel Dashboard:**
   - Proyecto `onni` → Settings → Environment Variables

2. **Variables requeridas en Production:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://dqzgliraciqoewmrygum.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [ver en Supabase]
   SUPABASE_SERVICE_KEY = [ver en Supabase]
   
   STRIPE_SECRET_KEY = sk_test_... (o production key)
   STRIPE_PUBLISHABLE_KEY = pk_test_...
   STRIPE_WEBHOOK_SECRET = whsec_...
   
   RESEND_API_KEY = re_... (opcional, para emails)
   RESEND_FROM = ONNI <noreply@onnicosmetics.com>
   
   NEXT_PUBLIC_SITE_URL = https://www.onnicosmetics.com
   ```

3. **Si faltan variables:**
   - Click "Add New Variable"
   - Agregá cada una
   - **Importante:** Seleccioná "Production" y "Preview"
   - Guardá

4. **Después de agregar variables:**
   - Vercel hace redeploy automáticamente
   - Si no, hacé redeploy manual (Opción 1)

---

### **Opción 3: Verificar Dominio Conectado**

Si la web carga pero sin los cambios:

1. **En Vercel Dashboard:**
   - Proyecto `onni` → Settings → Domains

2. **Verificá:**
   - ¿`onnicosmetics.com` está en la lista?
   - ¿Estado: ✅ Configured?
   - ¿`www.onnicosmetics.com` también está?

3. **Si no está:**
   - Click "Add Domain"
   - Escribí `onnicosmetics.com`
   - Seguí las instrucciones de DNS

---

## 🧪 TESTING DESPUÉS DEL FIX

Después del redeploy, verificá:

1. **Homepage carga sin errores:**
   - https://www.onnicosmetics.com/
   - Abrí consola (F12) → ¿Hay errores rojos?

2. **Páginas de producto funcionan:**
   - https://www.onnicosmetics.com/products/beauty-of-joseon-revive-eye-serum
   - ¿Carga sin error de fetch?

3. **Blog funciona:**
   - https://www.onnicosmetics.com/blog
   - ¿Se ven los 3 artículos?

4. **B2B funciona:**
   - https://www.onnicosmetics.com/b2b
   - ¿Carga la landing completa?

---

## 📞 SI SIGUE FALLANDO

**Pasos adicionales:**

1. **Compartí captura de pantalla de:**
   - Vercel Dashboard → Deployments (últimos 5 deploys)
   - Logs de error del deploy fallido (si está rojo)

2. **Verificá Node.js version en Vercel:**
   - Settings → Build → Node.js Version
   - Debería ser 18.x o 20.x

3. **Limpiá caché de Vercel completamente:**
   - Settings → Build → Clear build cache

---

## 📋 COMMITS RECIENTES EN GITHUB

Estos son los commits que deberían estar en producción:

```
f05ce5a - ci: force vercel redeploy 2026-05-01-2142
23a6c5b - feat: blog - 2 artículos completos
d308c8d - feat: landing B2B completa con requisitos y márgenes
d562fc4 - fix: debug imágenes + cache buster
d23b325 - fix: agregar imagen al agregar al carrito
580b13c - fix: UX improvements - remove custom cursor + fix cart sidebar
```

**Si GitHub tiene estos commits pero Vercel no los deployó, el problema es 100% de configuración de Vercel.**

---

**Contacto:** Si necesitás ayuda, compartí:
1. Captura de Vercel Deployments
2. Logs de error del build (si falla)
3. URL de preview de Vercel (si existe staging)
