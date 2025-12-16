# React Tourist Attraction Mini Project

โปรเจกต์แสดงสถานที่ท่องเที่ยวที่เป็นที่นิยม พร้อมระบบค้นหา โดยใช้ React + Vite สำหรับ Frontend และ Express.js สำหรับ Backend API

## 🏗️ โครงสร้างโปรเจกต์

```
react-tourist-attraction-mini-project/
├── client/          # React Frontend (Vite)
├── server/          # Express Backend API
│   ├── api/         # Vercel Serverless Functions (สำหรับ production)
│   ├── app.js       # Express app (สำหรับ development)
│   └── db.js        # ข้อมูลสถานที่ท่องเที่ยว
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

### Deploy ทั้ง Frontend และ Backend บน Vercel

โปรเจกต์นี้ใช้ Vercel Serverless Functions สำหรับ Backend API ซึ่งสามารถ deploy ทั้ง Frontend และ Backend ในโปรเจกต์เดียวกันได้

1. **Push โค้ดขึ้น GitHub**

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

   - Vercel จะ detect `vercel.json` อัตโนมัติ
   - **ไม่ต้องตั้ง Root Directory** (ใช้ root directory)
   - **Framework Preset**: Vite (จะ detect อัตโนมัติ)
   - **Build Command**: `npm run build` (สำหรับ client)
   - **Output Directory**: `dist`

4. **เพิ่ม Environment Variable**

   - ไปที่ Settings → Environment Variables
   - เพิ่มตัวแปรใหม่:
     - **Name**: `VITE_API_URL`
     - **Value**: `/api` (relative path สำหรับ Vercel Serverless Functions)
     - หรือใช้ full URL: `https://your-project.vercel.app/api`
   - **สำคัญ**: ใช้ relative path `/api` จะไม่มีปัญหา CORS

5. **Deploy**
   - กด "Deploy" และรอให้เสร็จ
   - Vercel จะ deploy ทั้ง Frontend และ Backend อัตโนมัติ

### API Endpoints

หลังจาก deploy แล้ว API endpoints จะอยู่ที่:

- `https://your-project.vercel.app/api/` - Root endpoint
- `https://your-project.vercel.app/api/trips` - ดึงข้อมูลทั้งหมด (พร้อม search)
- `https://your-project.vercel.app/api/trips/all` - ดึงข้อมูลทั้งหมด

## ✅ Checklist ก่อน Deploy

- [x] แก้ไข API URL ให้ใช้ environment variable
- [x] สร้าง `server/api/server.js` สำหรับ Vercel Serverless Functions
- [x] สร้าง `vercel.json` สำหรับ configuration
- [x] ตั้งค่า `VITE_API_URL` = `/api` ใน Vercel Environment Variables
- [ ] Deploy บน Vercel (จะ deploy ทั้ง Frontend และ Backend)
- [ ] ทดสอบว่า frontend เชื่อมต่อกับ backend ได้

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: React 18, Vite, Axios
- **Backend**: Express.js, Node.js, Vercel Serverless Functions
- **Deployment**: Vercel (Frontend + Backend)

## 📝 License

ISC
