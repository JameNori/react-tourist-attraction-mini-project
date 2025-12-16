import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "../server/db.js";

const app = express();

// CORS configuration - อนุญาตทุก origin (สำหรับ production)
app.use(
  cors({
    origin: "*",
    credentials: true,
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

// Export Express app as serverless function
export default app;
