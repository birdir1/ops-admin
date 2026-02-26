# Ops Panel Deploy Rehberi

Bu rehber, birdir1 ops panelini (`ops.birdir1.com`) sunucuya kurmak için adım adım talimatlar içerir.

---

## 📋 Ön Gereksinimler

- ✅ Sunucuda Node.js 20+ ve npm yüklü
- ✅ PM2 yüklü
- ✅ Nginx kurulu ve aktif
- ✅ DNS A kaydı: `ops.birdir1.com` → `37.140.242.105`
- ✅ Ops panel repo URL hazır

---

## 📋 Adım 1: Sunucuya Bağlan

```bash
ssh <deploy-user>@<server-host>
```

---

## 📋 Adım 2: Ops Panel Dizini Oluştur

```bash
mkdir -p /var/www/birdir1-ops
cd /var/www/birdir1-ops
```

---

## 📋 Adım 3: Repository'yi Clone Et

```bash
git clone <OPS_REPO_URL> .
```

---

## 📋 Adım 4: Node.js Bağımlılıklarını Yükle

```bash
npm install
```

---

## 📋 Adım 5: Environment Variables Ayarla

`.env.production` dosyası oluştur:

```bash
nano .env.production
```

İçine şunu yaz:

```bash
OPS_ADMIN_PASSWORD=<guclu-sifre>
GITHUB_TOKEN=<opsiyonel>
NODE_ENV=production
PORT=3004
```

---

## 📋 Adım 6: Build Et

```bash
npm run build
```

Başarılı olursa şu çıktıyı görürsün:

```
✓ Compiled successfully
```

---

## 📋 Adım 7: PM2 ile Çalıştır

```bash
pm2 stop birdir1-ops 2>/dev/null || true
pm2 delete birdir1-ops 2>/dev/null || true
pm2 start npm --name "birdir1-ops" -- start
pm2 save
pm2 startup
```

---

## 📋 Adım 8: Nginx Config Ayarı

Nginx config'e ops panel için reverse proxy ekle:

```nginx
server {
    listen 80;
    server_name ops.birdir1.com;

    location / {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Sonra Nginx'i reload et:

```bash
nginx -t
systemctl reload nginx
```

---

## 📋 Adım 9: SSL Sertifikası

```bash
certbot --nginx -d ops.birdir1.com
```

---

## 📋 Adım 10: Test Et

Tarayıcıda şu adrese git:

```
https://ops.birdir1.com
```

Login sayfasını görmelisin. Giriş için `OPS_ADMIN_PASSWORD` kullanılır.

---

## ✅ Tamamlandı!

Artık:
- ✅ Ops panel deploy edildi
- ✅ `https://ops.birdir1.com` adresinden erişilebilir
- ✅ PM2 ile otomatik başlatma aktif

---

## 🆘 Sorun Giderme

### Hata: "Cannot find module"
**Çözüm:** `npm install` çalıştır.

### Hata: "Port 3004 already in use"
**Çözüm:** Mevcut process'i durdur:
```bash
pm2 list
pm2 stop <process-id>
```

### Ops panel açılmıyor
**Çözüm:** 
1. PM2 logları kontrol et: `pm2 logs birdir1-ops`
2. Nginx logları kontrol et: `tail -f /var/log/nginx/error.log`

---

**Hazırlayan:** Teknik Destek  
**Tarih:** 26 Şubat 2026
