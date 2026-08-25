# 🚀 How to Deploy BharatPay on Render (render.com) — Step-by-Step Guide

Render is completely **free**, provides an automatic **HTTPS SSL certificate**, and deploys directly from your GitHub repository in 2 minutes.

---

## 📋 Quick Settings Cheat-Sheet for Render

| Field on Render | Value to Enter |
|---|---|
| **Service Type** | **Static Site** |
| **Name** | `bharatpay-superapp` (or your preferred name) |
| **Root Directory** | `iqoo-main` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** (Optional Env Var) | `NODE_VERSION = 20` |

---

## 🛠️ Step-by-Step Instructions

### Step 1: Push Your Code to GitHub
If you haven't pushed your latest code to GitHub yet, run these commands in your project terminal:
```bash
git add .
git commit -m "feat: complete BharatPay superapp and render config"
git push origin main
```

---

### Step 2: Create a New Static Site on Render
1. Go to [https://dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.
2. Click the blue **"New +"** button in the top right.
3. Select **"Static Site"**.

---

### Step 3: Connect Your GitHub Repository
1. In the list of repositories, find and select your repository (`Bpay` or `iqoo`).
2. Click **"Connect"**.

---

### Step 4: Configure the Build Settings
Enter the following exact settings on the configuration screen:

- **Name:** `bharatpay-superapp` (or any name you like)
- **Branch:** `main` (or `master`)
- **Root Directory:** `iqoo-main` *(Important: this is the folder where `package.json` is located)*
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

---

### Step 5: (Important for Single Page App) Add Redirect / Rewrite Rule
To make sure page reloads and routes work seamlessly without 404 errors:
1. Scroll down to **"Redirects/Rewrites"** in the Render settings.
2. Click **"Add Rule"**:
   - **Type:** `Rewrite`
   - **Source:** `/*`
   - **Destination:** `/index.html`
3. Click **"Save"**.

*(Note: We have also included `render.yaml` which automatically configures this rule for you!)*

---

### Step 6: Deploy & Get Your Live URL!
1. Click **"Create Static Site"**.
2. Render will run `npm install` and `npm run build`.
3. In ~60 seconds, your site will be live at:
   `https://bharatpay-superapp.onrender.com`

---

## 🎯 Verification Checklist
- [x] Tested `npm run build` locally (0 errors, 476 KB bundle).
- [x] Verified `dist/index.html` output path.
- [x] Configured `render.yaml` for automatic Blueprint detection.
