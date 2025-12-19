import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "../db.js";

const app = express();

// CORS configuration - ตั้งค่า CORS headers โดยตรงในทุก response
// ใช้วิธีนี้เพื่อให้แน่ใจว่า headers จะถูกส่งออกมาใน Vercel serverless functions
app.use((req, res, next) => {
  // ตั้งค่า CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Length, Content-Type"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ใช้ CORS middleware เป็น backup (สำหรับกรณีที่ middleware ด้านบนไม่ได้ทำงาน)
app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Length", "Content-Type"],
  })
);

app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API สำหรับดึงข้อมูลทั้งหมด
app.get("/trips", (req, res) => {
  let keywords = req.query.keywords;

  console.log("API /trips called with keywords:", keywords);

  // ถ้าไม่มี keywords ให้ส่งข้อมูลทั้งหมด
  if (!keywords || keywords.trim() === "") {
    console.log("No keywords provided, returning all trips");
    return res.json(trips);
  }

  // ถ้ามี keywords ให้ค้นหา
  const regexKeywords = keywords.split(" ").join("|");
  const regex = new RegExp(regexKeywords, "ig");
  const results = trips.filter((trip) => {
    return (
      trip.title.match(regex) ||
      trip.description.match(regex) ||
      trip.tags.filter((tag) => tag.match(regex)).length
    );
  });

  console.log(`Found ${results.length} trips matching "${keywords}"`);
  return res.json(results);
});

// API สำหรับดึงข้อมูลทั้งหมดโดยไม่ต้องมี query parameters
app.get("/trips/all", (req, res) => {
  return res.json(trips);
});

// Export handler function สำหรับ Vercel serverless functions
// ตั้งค่า CORS headers ก่อนส่งไปยัง Express app เพื่อให้แน่ใจว่าจะถูกส่งออกมา
export default function handler(req, res) {
  // ตั้งค่า CORS headers ก่อนส่งไปยัง Express app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ส่งไปยัง Express app
  return app(req, res);
}
