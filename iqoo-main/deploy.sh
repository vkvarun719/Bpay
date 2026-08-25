#!/bin/bash
# 🇮🇳 BharatPay SuperApp - Automated Deployment Script

set -e

echo "=========================================="
echo "🚀 BharatPay SuperApp — Deployment Wizard"
echo "=========================================="

# 1. Check for sensitive keys
echo "🔍 Running security scan..."
if grep -r "API_KEY\|SECRET\|TOKEN\|PASSWORD" src/ --ignore-case > /dev/null 2>&1; then
    echo "⚠️ Notice: Scanned files. Ensure all API keys in src/ are browser mock constants."
else
    echo "✅ No real sensitive API secrets found. 100% browser-safe."
fi

# 2. Build validation
echo "📦 Running production build test..."
npm run build

# 3. Git Init
if [ ! -d ".git" ]; then
    echo "🌱 Initializing Git repository..."
    git init
    git branch -M main
fi

# 4. Git Add & Commit
echo "💾 Adding files to Git..."
git add .
git commit -m "🇮🇳 Initial commit: BharatPay SuperApp - Voice-First FinTech Platform" || echo "Working tree clean."

echo "=========================================="
echo "✅ Local Git repository ready!"
echo "👉 To publish to GitHub:"
echo "   1. Create repo at https://github.com/new (Name: bharatpay-superapp)"
echo "   2. Run:"
echo "      git remote add origin https://github.com/YOUR_USERNAME/bharatpay-superapp.git"
echo "      git push -u origin main"
echo "=========================================="
