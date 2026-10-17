# 🪟 Windows O'rnatish Yo'riqnomasi

## Better-sqlite3 Muammosini Hal Qilish

Better-sqlite3 paketi Windows'da ishlashi uchun C++ build tools kerak. Quyidagi usullardan birini tanlang:

### Usul 1: Visual Studio Build Tools O'rnatish (Tavsiya)

1. **Visual Studio Build Tools** yuklab oling:
   - [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) sahifasiga boring
   - "Build Tools for Visual Studio 2022" ni yuklab oling
   - O'rnatishda **"Desktop development with C++"** workload-ni tanlang

2. Kompyuterni qayta ishga tushiring

3. Keyin npm install bajaring:
   ```powershell
   npm install
   ```

### Usul 2: Windows Build Tools (Avtomatik)

Cmd yoki PowerShell ni **Administrator** sifatida oching va bajaring:

```powershell
npm install --global --production windows-build-tools
```

Bu Python va Visual Studio Build Tools ni avtomatik o'rnatadi (vaqt oladi, 15-30 daqiqa).

Keyin:
```powershell
npm install
```

### Usul 3: Pre-built Binary Ishlatish (Eng Oson)

Agar build toollarni o'rnatishni xohlamasangiz, Node.js versiyangizni tekshiring:

```powershell
node --version
```

Keyin LTS versiyaga (v20 yoki v18) o'ting, chunki ular uchun pre-built binary mavjud:

1. [Node.js LTS](https://nodejs.org/) (v20.x) ni o'rnating
2. Loyihani yangi Node versiyada oching
3. npm install bajaring

### Usul 4: Muqobil SQLite Paketi (Hozircha)

Agar yuqoridagi usullar ishlamasa, oddiy `sqlite3` paketiga o'tamiz (biroz sekinroq, lekin ishlaydi):

1. `package.json` da o'zgartiring:
   ```json
   "dependencies": {
     "telegraf": "^4.16.3",
     "sqlite3": "^5.1.7",
     "dotenv": "^16.4.5"
   }
   ```

2. `src/database.js` faylida import qismini o'zgartiring:
   ```javascript
   import sqlite3 from 'sqlite3';
   const Database = sqlite3.verbose().Database;
   ```

3. Boshqa hamma narsa bir xil qoladi.

## Hozirgi Holat Tekshirish

Sizning Node versiyangiz: **v24.14.1**

Bu juda yangi versiya va pre-built binary bo'lmasligi mumkin. Tavsiya:

**Option A: Node.js 20 LTS ga o'tish** (Eng oson)
- [Node.js 20 LTS](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) ni yuklab oling
- O'rnating
- Loyihani yangi ochib npm install bajaring

**Option B: Build Tools o'rnatish** (Agar v24 da qolishni xohlasangiz)
- Yuqoridagi Usul 1 yoki 2 ni bajaring

## Tekshirish

O'rnatish to'g'ri bo'lganligini tekshirish:

```powershell
npm test
```

Agar test muvaffaqiyatli bo'lsa, botni ishga tushiring:

```powershell
npm start
```

## Yordam Kerakmi?

Agar hali ham muammo bo'lsa:
1. README.md faylini qayta o'qing
2. Node.js versiyani tekshiring: `node --version`
3. npm cache tozalang: `npm cache clean --force`
4. node_modules ni o'chiring va qayta o'rnating:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```
