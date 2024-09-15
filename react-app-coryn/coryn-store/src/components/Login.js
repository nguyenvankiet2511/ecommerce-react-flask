import React, { useEffect, useState } from "react"; // Import useState từ React
import accountsApi from "../api/accountsApi"; 
import {isLoggedIn, fetchProtectedData}  from "../api/authToken"; 
import oauthLoginApi from "../api/oauthLogin"
import { Link,useNavigate  } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  // Xử lý đăng nhập bằng Google
  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      // Gọi API lấy URL đăng nhập Google
      const response = await oauthLoginApi.getOauthLogin();
      const googleAuthUrl = response.data.authorization_url;

      // Chuyển hướng người dùng đến URL xác thực Google
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


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Xử lý gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
  };
    try {
      // Gọi API đăng nhập
      const response = await accountsApi.login(formData);
      console.log(response.data);
      const accessToken = response.data.access_token;
      const user_id = response.data.user_id;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user_id', user_id);
      navigate("/");
   
      // Xử lý phản hồi thành công
      setMessage(response.data.message); 
      setError("");
     
    } catch (err) {
      // Xử lý lỗi
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="body-main">
      <div className="main-form">
        <div className="background-login">
          <div className="shape-login"></div>
          <div className="shape-login"></div>
        </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <h3>Login Here</h3>

          <label className="label-login" htmlFor="username">
            Email
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
            Password
          </label>
          <input
            className="input-login"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            id="password"
          />

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}

          <div className="links">
            {/* 'Forgot Password' link */}
            <div className="forgot-password">
              <a href="#" >Forgot Password?</a>
            </div>

            {/* 'Create Account' link */}
            <Link to={"/register"}>
              <div className="create-account">
                <a href="#">Create an account</a>
              </div>
            </Link>
          </div>

          <button className="button-login" type="submit">
            Log In
          </button>
          <div className="social">
            <div className="go" onClick={loginGoogle}>
              <i className="fab fa-google"></i> Google
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
