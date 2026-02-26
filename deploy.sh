#!/bin/bash

# Ops Panel Deploy Script
# Bu script'i sunucuda çalıştırın: bash deploy.sh

set -e  # Hata olursa dur

APP_NAME="birdir1-ops"
APP_DIR="/var/www/birdir1-ops"
REPO_URL="${OPS_REPO_URL:-}"

if [ -z "$REPO_URL" ]; then
  echo "❌ OPS_REPO_URL tanımlı değil. Örnek:"
  echo "   export OPS_REPO_URL=\"https://github.com/birdir1/ops-admin.git\""
  exit 1
fi

if [ -z "$OPS_ADMIN_PASSWORD" ]; then
  echo "❌ OPS_ADMIN_PASSWORD tanımlı değil."
  echo "   export OPS_ADMIN_PASSWORD=\"<guclu-sifre>\""
  exit 1
fi

echo "🚀 Ops Panel Deploy başlatılıyor..."
echo ""

# 1. Dizin oluştur
echo "📁 Dizin oluşturuluyor..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# 2. Repository clone et (veya pull)
if [ -d ".git" ]; then
    echo "📥 Repository güncelleniyor..."
    git pull
else
    echo "📥 Repository clone ediliyor..."
    git clone "$REPO_URL" .
fi

# 3. Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
npm install

# 4. Environment variables ayarla
echo "⚙️ Environment variables ayarlanıyor..."
cat > .env.production << EOF
OPS_ADMIN_PASSWORD=${OPS_ADMIN_PASSWORD}
GITHUB_TOKEN=${GITHUB_TOKEN}
NODE_ENV=production
PORT=3004
EOF

# 5. Build et
echo "🔨 Build ediliyor..."
npm run build

# 6. PM2 ile çalıştır
echo "🚀 PM2 ile başlatılıyor..."
pm2 stop "$APP_NAME" 2>/dev/null || true  # Varsa durdur
pm2 delete "$APP_NAME" 2>/dev/null || true  # Varsa sil
pm2 start npm --name "$APP_NAME" -- start
pm2 save

echo ""
echo "✅ Ops Panel deploy tamamlandı!"
echo ""
echo "📊 PM2 durumu:"
pm2 list | grep "$APP_NAME"
echo ""
echo "🌐 Ops panel şu adresten erişilebilir:"
echo "   https://ops.birdir1.com"
echo ""
echo "🔑 Giriş bilgileri:"
echo "   OPS_ADMIN_PASSWORD ile giriş yapılır."
echo ""
echo "📝 Logları görmek için: pm2 logs $APP_NAME"
