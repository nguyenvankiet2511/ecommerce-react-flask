import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountsApi from "../api/accountsApi";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi biểu mẫu mặc định

    const userData = {
        name: fullName,
        username,
        email,
        password,
    };

    try {
        const response = await accountsApi.register(userData);
        console.log(response.data);
        alert(response.data.message);

        if (response.status === 200) {
            const userConfirmed = window.confirm(
                "Bạn có muốn đăng nhập với tài khoản vừa tạo?"
            );
            if (userConfirmed) {
                const formData = {
                    username,
                    password, 
                };
                console.log(formData);

                const loginResponse = await accountsApi.login(formData); 
                const accessToken = loginResponse.data.access_token;
                const user_id = loginResponse.data.user_id;
                const account_id = loginResponse.data.account_id;
                const role = loginResponse.data.role;

                localStorage.setItem("token", accessToken);
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("account_id", account_id);
                localStorage.setItem("role", role);

                navigate("/");
            }
        } else {
            alert("Đăng ký không thành công.");
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Hiện tại máy chủ không phản hồi. Hãy thử lại sau!");
    }
};


  return (
    <div className="body-main">
      <div className="main-form">
        <div className="background-login">
          <div className="shape-register"></div>
          <div className="shape-register"></div>
        </div>
        <form className="form-register" onSubmit={handleSubmit}>
          <h3>Đăng ký tài khoản</h3>
          <label className="label-register" htmlFor="fullName">
            Họ và tên
          </label>
          <input
            className="input-register"
            type="text"
            placeholder="Nhập họ và tên"
            id="fullName"
            value={fullName} // Bind value to state
            onChange={(e) => setFullName(e.target.value)} // Update state on change
          />

          <label className="label-register" htmlFor="username">
            Username
          </label>
          <input
            className="input-register"
            type="text"
            placeholder="Enter Username"
            id="username"
            value={username} // Bind value to state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />

          <label className="label-register" htmlFor="email">
            Email
          </label>
          <input
            className="input-register"
            type="email" // Change type to email for validation
            placeholder="Enter Email"
            id="email"
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />

          <label className="label-register" htmlFor="password">
            Password
          </label>
          <input
            className="input-register"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />

          <Link to={"/login"}>
            <div className="links">
              <div className="forgot-password">
                <a href="#">Are you have an account? Login here.</a>
              </div>
            </div>
          </Link>

          <button className="button-register" type="submit">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
