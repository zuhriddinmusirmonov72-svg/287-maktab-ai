# 🚀 Tez Boshlash (O'zbekcha)

## 1-qadam: Node.js o'rnating

**Node.js 20 LTS versiyasini yuklab oling (tavsiya etiladi):**
https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi

O'rnating va kompyuterni qayta ishga tushiring.

## 2-qadam: Loyihani tayyorlang

1. Loyiha papkasini oching
2. Cmd yoki PowerShell da bajaring:

```powershell
npm install
```

Agar xatolik chiqsa, `WINDOWS_SETUP.md` faylini o'qing.

## 3-qadam: Telegram bot yarating

1. Telegramda [@BotFather](https://t.me/BotFather) ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom va username kiriting
4. **Token ni nusxalang** (masalan: `1234567890:ABCdefGHIjklMNO...`)

## 4-qadam: OpenRouter API key oling

1. [OpenRouter.ai](https://openrouter.ai/) ga kiring
2. Ro'yxatdan o'ting (bepul)
3. [Keys](https://openrouter.ai/keys) sahifasiga o'ting
4. Yangi key yarating
5. **API key ni nusxalang** (masalan: `sk-or-v1-...`)

## 5-qadam: .env faylni yarating

`.env.example` faylini `.env` ga nusxalang:

```powershell
copy .env.example .env
```

`.env` faylni notepad da oching va to'ldiring:

```env
TELEGRAM_BOT_TOKEN=sizning_bot_tokeningiz
OPENROUTER_API_KEY=sizning_api_key
OPENROUTER_MODEL=openrouter/free
ADMIN_IDS=sizning_telegram_id
```

**Telegram ID ni topish:**
- [@userinfobot](https://t.me/userinfobot) ga xabar yuboring
- U sizning ID ni javob beradi

## 6-qadam: Botni ishga tushiring

```powershell
npm start
```

Ko'rishingiz kerak:
```
✅ Bot is running as @sizning_bot
```

## 7-qadam: Test qiling!

1. Telegramni oching
2. Botingizni qidiring
3. `/start` buyrug'ini yuboring
4. Savol bering!

## ❌ Muammolar

### `npm install` ishlamayapti

`WINDOWS_SETUP.md` faylni o'qing - Node.js 20 LTS versiyasiga o'ting.

### Bot javob bermayapti

1. `.env` fayl to'g'ri to'ldirilganini tekshiring
2. Bot token va API key to'g'ri ekanini tekshiring
3. Internet ulanishni tekshiring

### AI xatolik bermoqda

- OpenRouter API key to'g'ri va faol ekanini tekshiring
- Limitingiz qolganini tekshiring: [OpenRouter Usage](https://openrouter.ai/usage)

## 📚 To'liq yo'riqnoma

`README.md` faylda batafsil ma'lumot bor.

## 🆘 Yordam

Muammo yechilmasa:
1. Barcha qadamlarni qaytadan bajarib ko'ring
2. Node.js va npm versiyalarni tekshiring:
   ```powershell
   node --version
   npm --version
   ```
3. `WINDOWS_SETUP.md` ni o'qing

**Omad! 🎉**
