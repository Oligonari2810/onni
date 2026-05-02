# 🌸 ONNI Cosmetics — Brand Guidelines

**Multi-Brand K-Beauty Retailer for the Caribbean & Latin America**

**Version:** 1.0  
**Last Updated:** May 2, 2026  
**Company:** Arias Group Caribe SRL  
**Website:** www.onnicosmetics.com

---

## 📖 Table of Contents

1. [Brand Overview](#brand-overview)
2. [Visual Identity](#visual-identity)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Logo Usage](#logo-usage)
6. [UI Components](#ui-components)
7. [Brand Voice](#brand-voice)
8. [Photography Style](#photography-style)
9. [Application Examples](#application-examples)

---

## 🎯 Brand Overview

### **Mission**
Bring curated K-Beauty products to the Caribbean and Latin America, specifically formulated for tropical skin concerns: high UV, humidity, and hyperpigmentation.

### **Vision**
Become the leading multi-brand K-Beauty retailer in the Caribbean region, known for expert curation and climate-adapted formulations.

### **Values**
- **Curación, no fabricación** — We select, not manufacture
- **El Caribe como protagonista** — Caribbean-first approach
- **Tu hermana mayor** — The "Onni" (older sister) guidance
- **Ciencia coreana + Clima tropical** — Best of both worlds

### **Target Audience**
- **Primary:** Women 25-45, urban, skincare-conscious, Caribbean/LATAM
- **Secondary:** Clinics, spas, beauty professionals (B2B)
- **Geographic:** Dominican Republic, Puerto Rico, Trinidad & Tobago, Jamaica, Bahamas, Barbados, Colombia, Panama, Costa Rica

---

## 🎨 Visual Identity

### **Brand Essence**
**"K-Beauty seleccionado para el clima del Caribe"**

The visual identity balances:
- **Korean minimalism** (clean, elegant, sophisticated)
- **Caribbean warmth** (rose tones, soft creams, inviting)
- **Professional credibility** (clinical precision, trust)

### **Design Principles**
1. **Less is more** — Minimalist layouts, generous white space
2. **Soft femininity** — Rose/blush tones, rounded corners
3. **Scientific credibility** — Clean typography, structured grids
4. **Tropical adaptation** — Warm undertones, humidity-resistant aesthetics

---

## 🌈 Color Palette

### **Primary Colors**

| Name | Variable | Hex | RGB | Usage |
|------|----------|-----|-----|-------|
| **ONNI Rose** | `--rose` | `#C4497A` | `rgb(196, 73, 122)` | Primary brand color, CTAs, links, accents |
| **ONNI Blush** | `--blush` | `#E8B4C8` | `rgb(232, 180, 200)` | Secondary accents, highlights, Korean text |
| **ONNI Deep** | `--deep` | `#1A0A12` | `rgb(26, 10, 18)` | Primary text, hero backgrounds, headers |

### **Neutral Colors**

| Name | Variable | Hex | RGB | Usage |
|------|----------|-----|-----|-------|
| **ONNI Cream** | `--cream` | `#FAF4F0` | `rgb(250, 244, 240)` | Page backgrounds, main canvas |
| **ONNI Nude** | `--nude` | `#F0E4DC` | `rgb(240, 228, 220)` | Section backgrounds, cards |
| **ONNI Mist** | `--mist` | `#EDE0E8` | `rgb(237, 224, 232)` | Hover states, subtle backgrounds |
| **ONNI Charcoal** | `--charcoal` | `#2C1A24` | `rgb(44, 26, 36)` | Secondary text, footer |
| **ONNI Gray** | `--gray` | `#8A7280` | `rgb(138, 114, 128)` | Muted text, captions |
| **Pure White** | `--white` | `#FFFFFF` | `rgb(255, 255, 255)` | Product backgrounds, text on dark |

### **Accent/Functional Colors**

| Name | Hex | Usage |
|------|-----|-------|
| **Success Green** | `#2E7D4F` | Add to cart confirmation, success states |
| **Warning Amber** | `#D97706` | Low stock indicators, warnings |
| **Error Red** | `#DC2626` | Error states, remove actions |
| **Link Blue** | `#2563EB` | External links (if needed) |

### **Color Usage Guidelines**

```css
/* Primary CTA Buttons */
background: var(--rose);
color: var(--white);

/* Secondary/Accent Elements */
background: var(--blush);
color: var(--deep);

/* Page Background */
background: var(--cream);

/* Section Backgrounds */
background: var(--nude);

/* Text on Light Backgrounds */
color: var(--deep);

/* Text on Dark Backgrounds */
color: rgba(255, 255, 255, 0.6);

/* Links & Interactive */
color: var(--rose);
```

### **Gradients**

```css
/* Hero Circles Animation */
background: radial-gradient(135deg, var(--blush) 0%, var(--rose) 100%);

/* Product Card Hover */
background: rgba(196, 73, 122, 0.06);

/* Scrolled Nav */
background: rgba(250, 244, 240, 0.95);
backdrop-filter: blur(12px);
```

---

## 📝 Typography

### **Font Families**

| Font | Google Fonts | Weights | Usage |
|------|--------------|---------|-------|
| **Cormorant Garamond** | `Cormorant+Garamond` | 300, 400, 600, italic | Headlines, product names, quotes, luxury feel |
| **DM Sans** | `DM+Sans` | 300, 400, 500 | Body text, UI elements, buttons, captions |
| **Noto Serif KR** | `Noto+Serif+KR` | 300, 400 | Korean text (언니), cultural accents |

### **Font Import**

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Noto+Serif+KR:wght@300;400&display=swap" rel="stylesheet">
```

### **Type Scale**

#### **Headlines (Cormorant Garamond)**

| Element | Size | Weight | Letter Spacing | Line Height |
|---------|------|--------|----------------|-------------|
| H1 Hero | `clamp(4rem, 6vw, 7rem)` | 300 | Normal | 0.95 |
| H1 Section | `clamp(2.5rem, 4vw, 4rem)` | 300 | Normal | 1.1 |
| H2 | `2.2rem` | 300-400 | Normal | 1.2 |
| H3 | `1.3rem` | 400 | Normal | 1.2 |
| H4 | `0.82rem` | 400 | 0.1em | 1.4 |

#### **Body (DM Sans)**

| Element | Size | Weight | Letter Spacing | Line Height |
|---------|------|--------|----------------|-------------|
| Body Large | `1rem` | 300-400 | Normal | 1.7 |
| Body Regular | `0.88rem` | 400 | Normal | 1.7 |
| Body Small | `0.78rem` | 400 | Normal | 1.6 |
| Caption | `0.68rem` | 400 | 0.1em | 1.5 |
| Micro | `0.58rem` | 400 | 0.15em | 1.4 |

#### **Special Text**

| Element | Font | Size | Letter Spacing | Transform |
|---------|------|------|----------------|-----------|
| Navigation | DM Sans | 0.75rem | 0.15em | UPPERCASE |
| Buttons | DM Sans | 0.78rem | 0.15em | UPPERCASE |
| Labels/Badges | DM Sans | 0.68rem | 0.3em | UPPERCASE |
| Korean Accent | Noto Serif KR | 0.95rem | 0.2em | Normal |

### **Typography Usage Examples**

```css
/* Section Label (eyebrow text) */
.section-label {
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--rose);
}

/* Hero Title */
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(4rem, 6vw, 7rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--white);
}

/* Body Text */
p {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--gray);
}

/* Button */
.btn-primary {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

---

## 🏷️ Logo Usage

### **Primary Logo**

```
ONNI
```

**Specifications:**
- **Font:** Cormorant Garamond, 2rem, weight 300
- **Letter Spacing:** 0.2em
- **"O" Accent:** Italicized (`<em>O</em>NNI`)
- **Color:** Deep (#1A0A12) with Rose accent (#C4497A)

### **Logo with Korean**

```
언니 · Onni
```

**Specifications:**
- **Korean:** Noto Serif KR, 0.95rem
- **Separator:** Middle dot (·)
- **Usage:** Footer, about section, cultural contexts

### **Logo Clear Space**

Minimum clear space = height of the letter "O"

```
    [O]
[O]     [O]
    [O]
```

### **Logo Minimum Size**

- **Digital:** 24px height
- **Print:** 8mm height

### **Logo Don'ts**

❌ Don't stretch or distort  
❌ Don't change colors (except approved variations)  
❌ Don't add effects (shadows, gradients, outlines)  
❌ Don't rotate or angle  
❌ Don't place on busy backgrounds  

---

## 🧩 UI Components

### **Buttons**

#### **Primary Button**

```css
.btn-primary {
  padding: 16px 36px;
  background: var(--rose);
  color: var(--white);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  border-radius: 0; /* or 8px for softer feel */
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #a3365e; /* Darker rose */
}
```

#### **Secondary/Ghost Button**

```css
.btn-ghost {
  padding: 16px 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.3s;
}

.btn-ghost:hover {
  border-color: var(--blush);
  color: var(--blush);
}
```

### **Product Cards**

```css
.catalogo-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 36px 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s;
}

.catalogo-card:hover {
  background: rgba(196, 73, 122, 0.06);
}

.catalogo-image-wrapper {
  width: 100%;
  height: 200px;
  background: var(--white);
  border-radius: 4px;
  overflow: hidden;
}
```

### **Badges**

```css
.badge {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 4px;
}

.badge-bestseller {
  background: rgba(232, 180, 200, 0.2);
  color: var(--blush);
}

.badge-vegan {
  background: rgba(46, 125, 79, 0.15);
  color: #2E7D4F;
}

.badge-skin {
  background: rgba(138, 114, 128, 0.15);
  color: var(--gray);
}
```

### **Forms**

```css
.fg input,
.fg select,
.fg textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  color: var(--white);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.3s;
}

.fg input:focus,
.fg select:focus,
.fg textarea:focus {
  border-color: var(--rose);
}
```

### **Navigation**

```css
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 24px 48px;
  background: transparent;
  transition: all 0.4s;
}

nav.scrolled {
  background: rgba(250, 244, 240, 0.95);
  backdrop-filter: blur(12px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(196, 73, 122, 0.12);
}

.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.2em;
}

.nav-links a {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  opacity: 1;
  color: var(--rose);
}
```

---

## 🗣️ Brand Voice

### **Tone**

| Attribute | Description |
|-----------|-------------|
| **Warm** | Like an older sister (Onni) giving advice |
| **Knowledgeable** | Expert in K-Beauty and tropical skin |
| **Accessible** | No jargon, clear explanations |
| **Confident** | We know what works for the Caribbean |
| **Inclusive** | All skin tones, all Caribbean people |

### **Key Messages**

**Homepage Hero:**
> "K-Beauty seleccionado para el clima del Caribe"

**About/Manifiesto:**
> "Que el Caribe tenga por primera vez productos diseñados para su clima real y su realidad."

**Product Descriptions:**
> "Formulado para piel tropical: manchas, humedad y alta radiación UV"

**B2B Value Prop:**
> "Distribución selectiva. Un punto ONNI por zona. Catálogo validado."

### **Writing Guidelines**

✅ **DO:**
- Use "tú" (informal you) for DTC, "usted" for B2B
- Lead with benefits, not features
- Reference Caribbean climate explicitly
- Use Korean terms sparingly (온니, K-Beauty)
- Keep sentences short and scannable

❌ **DON'T:**
- Use beauty industry clichés ("miracle," "perfect")
- Make medical claims (use "helps," "supports," not "cures")
- Overpromise results
- Use European/Asian beauty standards

### **Sample Copy**

**Product Description (Goodal Green Tangerine):**
> "El sérum de vitamina C más vendido de Corea. Con 70% extracto de mandarina verde y Niacinamida, reduce manchas oscuras y unifica el tono. Fórmula estable que no se oxida rápidamente. Ideal para hiperpigmentación post-acné y melasma del Caribe."

**B2B Pitch:**
> "Trabajamos con clínicas, spas y profesionales que buscan una línea K-Beauty seleccionada para el clima del Caribe. ONNI desarrolla puntos selectivos por zona, con catálogo validado, soporte comercial y enfoque de prescripción."

---

## 📸 Photography Style

### **Product Photography**

| Aspect | Specification |
|--------|---------------|
| **Background** | Pure white (#FFFFFF) or product color |
| **Lighting** | Soft, diffused, no harsh shadows |
| **Angles** | Front (primary), 45°, top, texture swatch |
| **Size** | 800x1000px minimum, 4:5 aspect ratio |
| **Format** | WEBP (primary), PNG (transparency), JPG (fallback) |

### **Lifestyle Photography**

| Aspect | Specification |
|--------|---------------|
| **Setting** | Caribbean environments (beach, urban, home) |
| **Models** | Diverse Caribbean skin tones |
| **Lighting** | Natural, golden hour preferred |
| **Mood** | Relaxed, confident, authentic |
| **Colors** | Warm tones, complement brand palette |

### **Image Don'ts**

❌ Over-edited/filtered skin  
❌ Non-Caribbean settings (snow, mountains, etc.)  
❌ Inconsistent lighting across product shots  
❌ Watermarks or logos on images  
❌ Low resolution (<800px width)  

---

## 📱 Application Examples

### **Website Header**

```
┌─────────────────────────────────────────────────────────────┐
│  O̲NNI    Nosotros ▾   Productos   B2B      🛒(2)   ≡       │
└─────────────────────────────────────────────────────────────┘
```

### **Product Card Layout**

```
┌──────────────────────┐
│                      │
│   [Product Image]    │
│      (white bg)      │
│                      │
├──────────────────────┤
│ [Bestseller] [Vegano]│
│ Sérums               │
│ Green Tangerine...   │
│ Reduce manchas...    │
│ Best seller histórico│
│                      │
│      $24.00          │
│   [Agregar al carro] │
│    Visa MC Nequi     │
└──────────────────────┘
```

### **Email Template**

```
┌─────────────────────────────────────────────┐
│            O̲NNI                             │
│  K-Beauty para el Caribe                    │
├─────────────────────────────────────────────┤
│                                             │
│  Hola [Nombre],                             │
│                                             │
│  Nuevos productos coreanos llegaron 🇰🇷     │
│                                             │
│  [Product Grid 2x2]                         │
│                                             │
│  [Ver colección completa] →                 │
│                                             │
├─────────────────────────────────────────────┤
│  📍 Santo Domingo, RD                       │
│  📧 hola@onnicosmetics.com                  │
│  📱 @onni_cosmetics_rd                      │
└─────────────────────────────────────────────┘
```

### **Social Media Post (Instagram)**

```
┌───────────────────────────────┐
│                               │
│     [Lifestyle Image]         │
│     (Caribbean setting)       │
│                               │
├───────────────────────────────┤
│  ONNI Cosmetics               │
│  ✨ New: Reedle Shot 1300     │
│                               │
│  El producto más innovador    │
│  de VT con 1300 espículas     │
│  que renuevan tu piel.        │
│                               │
│  🇰🇷 Importado de Corea       │
│  🌴 Para clima tropical        │
│                               │
│  #KBeauty #Caribe #ONNI       │
└───────────────────────────────┘
```

---

## 📦 Brand Assets

### **File Structure**

```
/onni
  /brand
    /logo
      onni-logo-primary.svg
      onni-logo-secondary.svg
      onni-logo-korean.svg
    /colors
      color-palette.ase (Adobe Swatch)
      color-palette.css
    /fonts
      CormorantGaramond/
      DMSans/
      NotoSerifKR/
    /templates
      social-media-template.fig
      email-template.html
      product-card-template.fig
  /public
    /images
      /products/[slug]/main.webp
      /lifestyle/[scene].webp
```

### **Download Links**

- **Logo Pack:** [TBD - GitHub Releases]
- **Color Swatches:** [TBD - Figma]
- **Font Files:** [Google Fonts links above]
- **Templates:** [TBD - Figma Community]

---

## 🔄 Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | May 2, 2026 | Initial brand guidelines | Arias Group |

---

## 📞 Contact

**Arias Group Caribe SRL**  
Av. Independencia Km 6, Plaza Atala I, Santo Domingo, RD  
RNC: 1-33-63109-1 | Reg. Merc: 219020SD

**Email:** anamar@onnicosmetics.com  
**WhatsApp:** +1 (849) 475-4442  
**Instagram:** @onni_cosmetics_rd

---

*© 2026 ONNI Cosmetics · Arias Group Caribe SRL · All Rights Reserved*
