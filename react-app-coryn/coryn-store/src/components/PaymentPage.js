import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5001/create-payment", { amount });
      window.location.href = response.data.payment_url;  // Redirect tới URL thanh toán
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <h1>Thanh toán qua VNPAY</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền"
      />
      <button onClick={handlePayment}>Thanh toán</button>
    </div>
  );
};

export default PaymentPage;
