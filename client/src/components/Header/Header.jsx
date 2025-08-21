import React, { useState } from "react";
import "./Header.css";

function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const result = event.target.value;
    setSearchValue(result);
    console.log("Search input changed:", result);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // ป้องกัน refresh หน้า
      onSearch(searchValue); // ส่งค่าขึ้นไปให้ parent
    }
  };
  return (
    <header className="header">
      <h1 className="main-title">เที่ยวไหนดี</h1>
      <div className="search-container">
        <div className="search-label">ค้นหาที่เที่ยว</div>
        <input
          type="text"
          className="search-input"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className="search-separator"></div>
      </div>
    </header>
  );
}

export default Header;
