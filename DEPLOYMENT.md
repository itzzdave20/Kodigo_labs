# 🚀 Kodigo Labs - Free Deployment Guide

## Deploy to Railway (Recommended - 100% Free)

Railway offers $5/month free credit which is perfect for small Laravel projects.

### Step-by-Step Deployment:

1. **Sign up for Railway**
   - Go to https://railway.app
   - Click "Login" and sign up with GitHub
   - Authorize Railway to access your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `itzzdave20/Kodigo_labs`
   - Railway will automatically detect it's a Laravel project

3. **Add MySQL Database**
   - In your Railway project dashboard, click "+ New"
   - Select "Database" → "Add MySQL"
   - Railway will automatically create a MySQL database
   - Environment variables will be automatically linked

4. **Generate APP_KEY**
   - In your Railway project, go to "Variables" tab
   - Add a new variable: `APP_KEY`
   - Generate key by running locally: `php artisan key:generate --show`
   - Copy the output (e.g., `base64:xxxxx...`) and paste as value

5. **Configure Environment Variables**
   Railway auto-configures database variables, but verify these are set:
   - `APP_NAME` = Kodigo Labs
   - `APP_ENV` = production
   - `APP_KEY` = (your generated key)
   - `APP_DEBUG` = false
   - `APP_URL` = (Railway will provide this URL)

6. **Deploy**
   - Railway will automatically build and deploy
   - Wait 2-3 minutes for the first deployment
   - Your site will be live at: `https://kodigo-labs.up.railway.app` (or similar)

7. **Get Your Live URL**
   - Go to "Settings" tab in Railway
   - Under "Domains", click "Generate Domain"
   - Your site is now live! 🎉

---

## Alternative: Deploy to Render (Also Free)

Render offers free hosting with some limitations (spins down after inactivity).

### Render Deployment:

1. **Sign up for Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub: `itzzdave20/Kodigo_labs`

3. **Configure Build**
   - **Name**: kodigo-labs
   - **Environment**: Docker (or Web Service)
   - **Build Command**: `composer install --no-dev && npm ci && npm run build`
   - **Start Command**: `php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT`

4. **Add Database**
   - In Render dashboard, create a new "PostgreSQL" database (free tier)
   - Or use an external MySQL database

5. **Environment Variables**
   Add these in Render's Environment section:
   ```
   APP_KEY=(generate with: php artisan key:generate --show)
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=mysql
   DB_HOST=(from your database)
   DB_PORT=3306
   DB_DATABASE=(your db name)
   DB_USERNAME=(your db user)
   DB_PASSWORD=(your db password)
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Your site will be live in 3-5 minutes

---

## Alternative: Deploy to Vercel (Free - Requires Serverless Adaptation)

Vercel is great but requires adaptation for Laravel serverless deployment.

### Quick Setup:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in your project directory
3. Follow prompts

**Note**: Laravel on Vercel requires special configuration. Railway or Render are better choices.

---

## Post-Deployment Checklist

✅ **Verify Your Site**
- [ ] Homepage loads correctly
- [ ] Logo appears in header, footer, and browser tab
- [ ] Navigation links work
- [ ] Contact form submits successfully
- [ ] Email notifications work (configure SMTP in production)

✅ **Configure Email (Gmail SMTP)**
Gmail requires an App Password, not your normal login password.

1. Turn on 2-Step Verification: https://myaccount.google.com/signinoptions/two-step-verification
2. Create an App Password: https://myaccount.google.com/apppasswords
3. In Render → Environment, set:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=kodigolabs.dev@gmail.com
MAIL_PASSWORD=your-16-character-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=kodigolabs.dev@gmail.com
MAIL_FROM_NAME=Kodigo Labs
MAIL_TO_ADDRESS=kodigolabs.dev@gmail.com
```

Do **not** commit `MAIL_PASSWORD` to git. Gmail also requires `MAIL_FROM_ADDRESS` to match the Gmail account.

✅ **Custom Domain (Optional)**
- Railway: Settings → Domains → Add custom domain
- Render: Settings → Custom Domain
- Update DNS records with your domain provider

---

## 💰 Pricing Summary

| Platform | Free Tier | Database | Best For |
|----------|-----------|----------|----------|
| **Railway** | $5/month credit | ✅ MySQL included | Laravel projects (Recommended) |
| **Render** | Limited hours | ✅ PostgreSQL included | Small projects |
| **Vercel** | Unlimited | ❌ External DB needed | Static/serverless |

---

## 🆘 Troubleshooting

**Build fails?**
- Check that `composer.json` has PHP 8.2 requirement
- Verify all dependencies are in `composer.json`

**Database connection error?**
- Verify environment variables are set correctly
- Ensure MySQL service is running
- Check `DB_CONNECTION=mysql` not `sqlite`

**Assets not loading?**
- Run `npm run build` before deploying
- Check `APP_URL` matches your domain
- Verify `public/build` folder is generated

**500 Error?**
- Check logs in Railway/Render dashboard
- Verify `APP_KEY` is set
- Set `APP_DEBUG=true` temporarily to see errors

---

## 📝 Recommended: Railway Deployment

Based on your Laravel + MySQL setup, **Railway is the best choice** because:
- ✅ True free tier ($5/month credit)
- ✅ MySQL database included
- ✅ Automatic Laravel detection
- ✅ Environment variables auto-configured
- ✅ Fast deployments (2-3 minutes)
- ✅ Easy custom domains
- ✅ Great for portfolios and small projects

**Start here**: https://railway.app

---

## 🎉 Your Site Will Be Live At:

After Railway deployment, your portfolio will be accessible at:
- **Railway URL**: `https://kodigo-labs.up.railway.app` (or similar)
- **Custom Domain**: Setup your own domain after deployment

---

*Created: September 3, 2026*
*Project: Kodigo Labs Portfolio*
*Repository: https://github.com/itzzdave20/Kodigo_labs.git*
