import React from "react";
import { useLocation } from "react-router-dom";

const PaymentCallback = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const responseCode = query.get("vnp_ResponseCode");

  return (
    <div>
      {responseCode === "00" ? (
        <h1>Thanh toán thành công!</h1>
      ) : (
        <h1>Thanh toán thất bại!</h1>
      )}
    </div>
  );
};

export default PaymentCallback;
