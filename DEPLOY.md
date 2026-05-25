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
