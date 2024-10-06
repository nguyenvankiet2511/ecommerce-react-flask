import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentExecute = () => {
  const navigate= useNavigate();
  const handleExecutePayment = async () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId'); 
    const payerId = urlParams.get('PayerID');     
    console.log(paymentId);
    console.log(payerId);

    const response = await fetch('http://localhost:5001/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, payerId }),
    });

    if (response.ok) {
      const data = await response.json();
      navigate("/sucessful-checkout");
    } else {
      console.error('Lỗi khi thực hiện thanh toán');
    }
  };

  useEffect(() => {
    handleExecutePayment();  
  }, []);

  return <div>Đang xử lý thanh toán...</div>;
};

export default PaymentExecute;
