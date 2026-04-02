#!/bin/bash

echo "🚀 ONNI Setup & Quick Start"
echo ""
echo "1️⃣  Installing dependencies..."
npm install

echo ""
echo "2️⃣  Setting up environment..."
cp .env.example .env.local

echo ""
echo "3️⃣  Configuration:"
echo "   - Created .env.local (edit with your Supabase credentials)"
echo "   - Next.js configured for ES modules"
echo "   - Tailwind CSS optimized"
echo "   - TypeScript strict mode enabled"

echo ""
echo "4️⃣  Ready to start:"
echo "   npm run dev          → Start dev server (localhost:3000)"
echo "   npm run build        → Build for production"
echo "   npm run start        → Run production build"
echo ""
echo "5️⃣  Next steps:"
echo "   1. Get Supabase credentials (https://supabase.com)"
echo "   2. Fill .env.local with SUPABASE_URL and ANON_KEY"
echo "   3. Create 'inquiries' table (see DEPLOYMENT.md)"
echo "   4. Test: npm run dev"
echo "   5. Deploy: Push to GitHub, connect Vercel"
echo ""
echo "📚 See DEPLOYMENT.md for full setup guide"
