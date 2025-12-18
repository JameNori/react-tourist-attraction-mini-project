import { useState, useEffect } from "react";
import axios from "axios";
import "./DataProvider.css";

function DataProvider({ children }) {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ใช้ environment variable สำหรับ API URL (สำหรับ production)
  // ถ้าไม่มีจะใช้ localhost เป็นค่า default (สำหรับ development)
  
  const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:4001"
  ).replace(/\/$/, "");

  useEffect(() => {
    fetchTravelData();
  }, []);

  const fetchTravelData = async () => {
    try {
      setLoading(true);
      setError(null);

      // ใช้ API_URL จาก environment variable
      const response = await axios.get(`${API_URL}/trips?keywords=`);
      setTravelData(response.data);
      console.log(
        "Loaded travel data from server:",
        response.data.length,
        "items"
      );
    } catch (err) {
      console.error("Error fetching travel data:", err);
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลจาก server");
    } finally {
      setLoading(false);
    }
  };

  const refetchData = () => {
    fetchTravelData();
  };

  // เพิ่มฟังก์ชันค้นหา
  const searchTrips = async (keywords) => {
    try {
      setLoading(true);
      setError(null);

      if (!keywords.trim()) {
        // ถ้าไม่มีคำค้นหา ไม่ต้องทำอะไร (ป้องกันการเรียก API ซ้ำ)
        setLoading(false);
        return;
      }

      // ค้นหาจาก server API โดยใช้ API_URL จาก environment variable
      const response = await axios.get(
        `${API_URL}/trips?keywords=${encodeURIComponent(keywords)}`
      );
      setTravelData(response.data);
      console.log(`Found ${response.data.length} trips matching "${keywords}"`);
    } catch (err) {
      console.error("Error searching trips:", err);
      setError("เกิดข้อผิดพลาดในการค้นหา");
    } finally {
      setLoading(false);
    }
  };

  // ส่งข้อมูลและฟังก์ชันไปยัง children
  return children({
    travelData,
    loading,
    error,
    refetch: refetchData,
    searchTrips,
  });
}

export default DataProvider;
