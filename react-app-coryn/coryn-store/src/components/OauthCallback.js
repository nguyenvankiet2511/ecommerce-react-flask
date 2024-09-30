import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const access_token = queryParams.get('access_token');
    const user_id = queryParams.get('user_id');
    const role = queryParams.get('role');

    if (access_token) {
      // Save token and other info in localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('role', role);
      
      // Log success message for debugging
      console.log('Đăng nhập thành công:', access_token);

      // Redirect user after successful login
      navigate('/');
    } else {
      // Set error message if access token is missing
      setErrorMessage('Thiếu thông tin xác thực. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h1>Đang xử lý đăng nhập...</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default OAuthCallback;
