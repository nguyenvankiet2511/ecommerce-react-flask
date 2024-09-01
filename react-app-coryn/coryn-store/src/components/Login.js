import React, { useState } from 'react'; // Import useState từ React
import accountsApi from './accountsApi'; // Import accountsApi từ tệp tương ứng

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
    
    try {
      // Gọi API đăng nhập
      const response = await accountsApi.login(username, password);

      // Xử lý phản hồi thành công
      setMessage(response.data.message); // Hoặc `response.message` tùy thuộc vào cấu trúc phản hồi
      setError('');
    } catch (err) {
      // Xử lý lỗi
      setError(err.response?.data?.error || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className='main-form'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='form-login' onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label className='label-login' htmlFor="username">Username</label>
        <input
          className='input-login'
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Email or Username"
          id="username"
        />

        <label className='label-login' htmlFor="password">Password</label>
        <input
          className='input-login'
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
            <a href="#">Forgot Password?</a>
          </div>

          {/* 'Create Account' link */}
          <div className="create-account">
            <a href="#">Create an account</a>
          </div>
        </div>

        <button className='button-login' type="submit">Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div>
      </form>
    </div>
  );
}
