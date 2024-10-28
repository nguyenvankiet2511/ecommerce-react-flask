// src/TestPicture.js
import React, { useEffect } from "react";
import Picture from "./Picture";

export default function TestPicture() {
  useEffect(() => {
    const { renderer } = Picture(); // Gọi hàm tạo scene

    // Dọn dẹp khi component unmount
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Chỉ chạy một lần khi component được mount

  return null; // Không cần render gì từ component này
}

