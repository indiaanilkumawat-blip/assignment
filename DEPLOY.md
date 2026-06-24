# Deployment Guide

## MongoDB Atlas Setup
1. In Atlas → Network Access → Add IP: `0.0.0.0/0` (required for Vercel)
2. Your cluster: `assignment.ogxz8jk.mongodb.net`
3. Database user: `indiaanilkumawat_db_user`

## Vercel Environment Variables
Go to Vercel → Your Project → Settings → Environment Variables and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://indiaanilkumawat_db_user:YOUR_DB_PASSWORD@assignment.ogxz8jk.mongodb.net/assignmenthub?retryWrites=true&w=majority&appName=assignment` |
| `JWT_SECRET` | A long random string (generate at https://randomkeygen.com) |
| `ADMIN_PASSWORD` | Your chosen admin password |

> Replace `YOUR_DB_PASSWORD` with the password you set in Atlas (xiDmBEmjnSbNxN1Q or your new one).

## Deploy Steps
1. Push this project to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Add the environment variables above
4. Click Deploy

## Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in your values (replace `<db_password>` with your actual Atlas password)
3. Run: `npm install && npm run dev`

## Content Management (CMS)

After deploying, log in at `/admin/login` with your `ADMIN_PASSWORD`. The admin panel has four sections:

- **Inquiries** (`/admin/dashboard`) — view inquiries, update status, reply via email/WhatsApp, and download any file the student attached.
- **Pages** (`/admin/pages`) — create/edit content pages (Terms, Privacy, About, etc.) with an HTML editor and per-page SEO. Click **⚡ Seed Terms & Privacy** once to auto-create the default Terms & Conditions and Privacy Policy pages.
- **Content** (`/admin/content`) — manage the homepage blocks: Services, Domains, How It Works, Why Choose Us, Testimonials and FAQs. Empty sections fall back to built-in defaults, so the site always renders.
- **Settings** (`/admin/settings`) — edit brand/contact details, business info, address, social links, homepage stat numbers, and all SEO/SMO defaults (these also feed the sitemap and robots files).

### First-run checklist
1. Log into `/admin/login`.
2. Open **Settings** → set your real address, social links, Site URL (for canonical/sitemap), and confirm the stat numbers. Save.
3. Open **Pages** → click **⚡ Seed Terms & Privacy** to publish those two pages (they appear in the footer automatically).
4. (Optional) Open **Content** to customise services/testimonials/FAQs; leaving them empty keeps the built-in defaults.

> All public pages use `force-dynamic`, so admin edits appear on the live site immediately — no redeploy needed.
