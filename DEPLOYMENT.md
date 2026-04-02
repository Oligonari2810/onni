# Vercel Deployment Guide

## 1. Supabase Setup

### Create Free Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create new project (select region closest to you)
- Wait for provisioning (~2 min)

### Create `inquiries` Table

In Supabase dashboard → SQL Editor, paste:

```sql
CREATE TABLE public.inquiries (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  establishment TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert" 
ON public.inquiries 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to read" 
ON public.inquiries 
FOR SELECT USING (true);
```

### Get Credentials

- Settings → API → Project URL = `NEXT_PUBLIC_SUPABASE_URL`
- Settings → API → Anon Key = `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 2. Vercel Deployment

### Connect GitHub

1. Push to GitHub:
```bash
git add .
git commit -m "Initial Next.js setup"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your `onni` repository
4. Vercel auto-detects Next.js ✓

### Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

- `NEXT_PUBLIC_SUPABASE_URL` = *your-supabase-url*
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *your-anon-key*

### Deploy

1. Click "Deploy"
2. Wait ~3-5 minutes
3. Get live URL: `https://onni-[random].vercel.app`

### Custom Domain

1. Add domain in Vercel → Settings → Domains
2. Update DNS records (Vercel shows exact steps)
3. SSL certificate auto-issued

---

## 3. Local Testing

Before pushing to Vercel, test locally:

```bash
# Create .env.local with real Supabase credentials
cp .env.example .env.local

# Add your values:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Test locally
npm run dev
# Open http://localhost:3000

# Test form submission
# Fill form and submit → Check Supabase dashboard for new row
```

---

## 4. Next Steps (Optional)

### Email Notifications
```bash
npm install resend
# Get API key from resend.com
# Add RESEND_API_KEY to .env
# Uncomment email code in app/api/inquiries/route.ts
```

### Analytics
```bash
# In package.json scripts:
"build": "next build && npx vercel build"

# Vercel Analytics auto-enabled
```

### Monitoring
- Vercel Web Vitals (auto)
- Error tracking via Sentry (optional)
- Database logs in Supabase

---

## 5. Troubleshooting

**Form not submitting?**
- Check console for errors
- Verify Supabase URL/Key in Vercel env vars
- Check `inquiries` table exists + RLS policies enabled

**Build fails on Vercel?**
- Check "Deployments" → failed build → logs
- Usually missing env var

**Slow performance?**
- Enable Vercel Edge Functions
- Add image optimization
- Use Supabase replication for backups

---

**Deployed!** 🎉 Your site is live and ready to collect B2B inquiries.
