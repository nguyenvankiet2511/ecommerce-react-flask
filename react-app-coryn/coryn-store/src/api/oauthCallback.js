import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuthCallback() {
  const location = useLocation();  // Lấy URL hiện tại
  const navigate = useNavigate();  // Điều hướng

  useEffect(() => {
    // Lấy mã ủy quyền từ URL (sau khi Google chuyển hướng người dùng về)
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      // Gọi API đến Flask /callback để trao đổi mã ủy quyền lấy token
      axios.get(`http://localhost:5000/callback?code=${code}`)
        .then(response => {
          const accessToken = response.data.access_token;

          // Lưu token vào localStorage
          localStorage.setItem("token", accessToken);

          // Chuyển hướng người dùng về trang chủ hoặc trang mong muốn sau khi đăng nhập thành công
          navigate("/");
        })
        .catch(error => {
          console.error("Lỗi khi lấy token từ Google", error);
        });
    } else {
      console.error("Không có mã ủy quyền trong URL");
    }
  }, [location, navigate]);

  return (
    <div>
      
    </div>
  );
}
