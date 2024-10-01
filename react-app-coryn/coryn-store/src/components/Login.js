import React, { useEffect, useState } from "react";
import accountsApi from "../api/accountsApi";
import oauthLoginApi from "../api/oauthLogin";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn, fetchProtectedData } from "../api/authToken";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(""); 

  // Xử lý đăng nhập bằng Google
  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await oauthLoginApi.getOauthLogin();
      const googleAuthUrl = response.data.authorization_url;
      window.location.href = googleAuthUrl;
    } catch (err) {
      console.error("Lỗi khi đăng nhập bằng Google", err);
      setError("Failed to login with Google");
    }
  };

 

 

  // Xử lý thay đổi tên người dùng
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Xử lý gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError("Vui lòng chọn người dùng!");
      return;
    }

    const formData = {
      username,
      password,
    };

    try {
      const response = await accountsApi.login(formData);
      console.log(response.data);
      const accessToken = response.data.access_token;
      const user_id = response.data.user_id;
      const account_id = response.data.account_id;
      const role = response.data.role;

      console.log(role);
      console.log(selectedRole);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("account_id", account_id);
      localStorage.setItem("role", role);

      if (selectedRole == role) {
        if (selectedRole == "ADMIN") {
          navigate("/admin");
          return;
        }
        if (selectedRole == "CUSTOMER") {
          navigate("/");
          return;
        }
        if (selectedRole == "EMPLOYEE") {
          navigate("/employee");
          return;
        }
      } else {
        alert("Tài khoản không chính xác! Vui lòng thử lại.");
        return;
      }
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    console.log(selectedRole);
  };

  return (
    <div className="body-main">
      <div className="main-form">
        <div className="background-login">
          <div className="shape-login"></div>
          <div className="shape-login"></div>
        </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <h3>CORYN STORE</h3>

          <label className="label-login" htmlFor="username">
            Tên tài khoản
          </label>
          <input
            className="input-login"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            id="username"
          />

          <label className="label-login" htmlFor="password">
            Mật khẩu
          </label>
          <input
            className="input-login"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            id="password"
          />

          <label className="label-login" htmlFor="role">
            Vai trò:
          </label>
          <select
            className="input-login role-select"
            id="role"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">-- Người sử dụng --</option>
            <option value="CUSTOMER">Khách hàng</option>
            <option value="EMPLOYEE">Nhân viên</option>
            <option value="ADMIN">Quản trị viên</option>  
          </select>

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}

          <div className="links">
            {/* 'Forgot Password' link */}
            <div className="forgot-password">
              <a href="#">Quên mật khẩu?</a>
            </div>

            {/* 'Create Account' link */}
            <Link to={"/register"}>
              <div className="create-account">
                <a href="#">Chưa có tài khoản?</a>
              </div>
            </Link>
          </div>

          <button className="button-login" type="submit">
            Đăng nhập
          </button>

          <div className="social">
            <div className="go" onClick={loginGoogle}>
              <i class="fa-brands fa-google"></i>
              Google
            </div>
            <div className="fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
