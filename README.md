# React Tourist Attraction Mini Project

โปรเจกต์แสดงสถานที่ท่องเที่ยวที่เป็นที่นิยม พร้อมระบบค้นหา โดยใช้ React + Vite สำหรับ Frontend และ Express.js สำหรับ Backend API

## 🏗️ โครงสร้างโปรเจกต์

```
react-tourist-attraction-mini-project/
├── client/          # React Frontend (Vite)
├── server/          # Express Backend API
└── info/            # ไฟล์ข้อมูลเสริม
```

## 🚀 การติดตั้งและรันโปรเจกต์

### Development Mode

#### 1. ติดตั้ง dependencies สำหรับ Client

```bash
cd client
npm install
```

#### 2. ติดตั้ง dependencies สำหรับ Server

```bash
cd server
npm install
```

#### 3. รัน Server (Terminal 1)

```bash
cd server
npm run dev
```

Server จะรันที่ `http://localhost:4001`

#### 4. รัน Client (Terminal 2)

```bash
cd client
npm run dev
```

Client จะรันที่ `http://localhost:5173` (หรือ port อื่นที่ Vite กำหนด)

### Environment Variables

สำหรับ development ใช้ค่า default `http://localhost:4001` อัตโนมัติ  
ถ้าต้องการเปลี่ยนสามารถสร้างไฟล์ `.env.local` ใน `client/` และใส่:

```
VITE_API_URL=http://localhost:4001
```

## 📦 การ Build สำหรับ Production

### Client

```bash
cd client
npm run build
```

ไฟล์ build จะอยู่ใน `client/dist/`

### Server

Server ใช้ `npm start` (ใช้ `node app.js`) สำหรับ production

## 🌐 การ Deploy

### Client - Deploy บน Vercel

1. **Push โค้ดขึ้น GitHub** (ถ้ายังไม่มี)

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **เชื่อมต่อ Vercel**

   - ไปที่ [vercel.com](https://vercel.com)
   - Sign in ด้วย GitHub account
   - กด "Add New Project"
   - เลือก repository นี้

3. **ตั้งค่าโปรเจกต์บน Vercel**

   - **Root Directory**: `client`
   - **Framework Preset**: Vite (จะ detect อัตโนมัติ)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **เพิ่ม Environment Variable**

   - ไปที่ Settings → Environment Variables
   - เพิ่มตัวแปรใหม่:
     - **Name**: `VITE_API_URL`
     - **Value**: URL ของ server ที่ deploy แล้ว (เช่น `https://your-server.railway.app`)
   - **สำคัญ**: ต้อง deploy server ก่อน แล้วค่อยใส่ URL นี้

5. **Deploy**
   - กด "Deploy" และรอให้เสร็จ

### Server - Deploy บน Railway (แนะนำ)

1. **Push โค้ดขึ้น GitHub** (ถ้ายังไม่มี)

2. **เชื่อมต่อ Railway**

   - ไปที่ [railway.app](https://railway.app)
   - Sign up/Sign in ด้วย GitHub account
   - กด "New Project" → "Deploy from GitHub repo"
   - เลือก repository นี้

3. **ตั้งค่าโปรเจกต์บน Railway**

   - Railway จะ detect โปรเจกต์อัตโนมัติ
   - **Root Directory**: `server` (ถ้าไม่ถูกต้อง ให้ตั้งเอง)
   - **Start Command**: `npm start` (ควรจะเป็น default)

4. **เพิ่ม Environment Variable** (ถ้าจำเป็น)

   - Railway จะกำหนด PORT อัตโนมัติ
   - ถ้า server ใช้ `process.env.PORT` ก็ไม่ต้องตั้งอะไรเพิ่ม

5. **Deploy**

   - Railway จะ deploy อัตโนมัติและให้ URL (เช่น `https://your-app.railway.app`)
   - **คัดลอก URL นี้ไว้** เพื่อไปตั้งค่าใน Vercel

6. **อัพเดท Vercel Environment Variable**
   - กลับไปที่ Vercel project
   - ไปที่ Settings → Environment Variables
   - แก้ไข `VITE_API_URL` ให้เป็น URL จาก Railway
   - Redeploy project

### Server - Deploy บน Render (ทางเลือก)

1. ไปที่ [render.com](https://render.com)
2. สร้าง **Web Service** ใหม่
3. เชื่อมต่อ GitHub repository
4. ตั้งค่า:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Render จะให้ URL (เช่น `https://your-app.onrender.com`)

## ✅ Checklist ก่อน Deploy

- [x] แก้ไข API URL ให้ใช้ environment variable
- [x] ปรับ `server/package.json` ให้มี production start script
- [ ] Deploy server บน Railway/Render
- [ ] Copy server URL และตั้งค่า `VITE_API_URL` ใน Vercel
- [ ] Deploy client บน Vercel
- [ ] ทดสอบว่า frontend เชื่อมต่อกับ backend ได้

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: React 18, Vite, Axios
- **Backend**: Express.js, Node.js
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## 📝 License

ISC
