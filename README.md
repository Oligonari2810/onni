# ONNI — K-Beauty Formulado para el Caribe

Landing page and B2B distribution platform for Onni cosmetics brand.

**Stack:** Next.js 15 + TypeScript + Tailwind CSS + Supabase + Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Vercel account (for deployment)

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/Oligonari2810/onni.git
cd onni
npm install
```

2. **Set up environment:**
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

3. **Create Supabase table:**
```sql
CREATE TABLE inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  establishment TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. **Run locally:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📋 Features

- ✅ Landing page with hero, products, B2B section
- ✅ Multi-language (ES / EN / FR)
- ✅ Custom cursor animation
- ✅ Scroll reveal animations
- ✅ Responsive design (mobile-first)
- ✅ B2B inquiry form with validation
- ✅ Supabase integration for persistent storage
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling

---

## 🏗️ Project Structure

```
onni/
├── app/
│   ├── api/inquiries/route.ts     # POST API for form submissions
│   ├── globals.css                # Global styles + animations
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── Navbar.tsx                 # Navigation with language switcher
│   ├── Hero.tsx                   # Hero section
│   └── ContactForm.tsx            # B2B contact form
├── lib/
│   ├── i18n.ts                    # Translation strings
│   └── supabase.ts                # Supabase client
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── package.json
└── .env.example                   # Environment variables template
```

---

## 📝 Forms & Submissions

**B2B Contact Form:**
- Validates all fields (name, email, establishment, country, message)
- Stores inquiries in Supabase `inquiries` table
- Real-time feedback to user

API endpoint: `POST /api/inquiries`

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`

### Translations
Edit `lib/i18n.ts` to add/update text for ES/EN/FR

### Fonts
Configured in `app/layout.tsx` and `app/globals.css`

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub** and connect Vercel
2. **Add environment variables** in Vercel dashboard
3. **Auto-deploys on push to main**

---

## ✅ Next Steps

1. Set up Supabase `inquiries` table
2. Add environment variables to `.env.local`
3. Test locally: `npm run dev`
4. Deploy to Vercel
5. Add custom domain

---

**Last updated:** April 2, 2026