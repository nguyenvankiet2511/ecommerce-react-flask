import React from 'react';

const PayPalButton = () => {
  const handleCreateOrder = async () => {
    const response = await fetch('http://localhost:5001/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: '10.00' }), 
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.approval_url; 
    } else {
      console.error('Lỗi khi tạo đơn hàng');
    }
  };

  return (
    <div>
      <button onClick={handleCreateOrder}>Thanh toán bằng PayPal</button>
    </div>
  );
};

export default PayPalButton;
