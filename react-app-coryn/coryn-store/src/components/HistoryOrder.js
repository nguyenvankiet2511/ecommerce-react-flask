import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import orderApi from "../api/orderApi";

export default function HistoryOrder() {
  const user_id = localStorage.getItem("user_id");
  const [historyOrder, setHistoryOrder] = useState([]);

  useEffect(() => {
    fetchHistoryOrder();
  }, []);

  const fetchHistoryOrder = async () => {
    const history = await orderApi.getHistoryOrder(user_id);
    console.log(history.data);
    setHistoryOrder(history.data);
  };

  return (
    <>
      <Header />
      <div className="order-history-his">
        <h1 style={{ color: "rgb(63, 120, 6)" }}>
          <i className="fa fa-history" style={{ marginRight: "8px" }}></i> Lịch
          sử mua hàng
        </h1>

        {historyOrder.length > 0 ? (
          historyOrder.map((order) => (
            <div className="order-his" key={order.order_id}>
              <div className="order">
                <h2>Đơn hàng #{order.order_id}</h2>
                <p>
                  Ngày đặt hàng:{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  Ngày giao hàng:{" "}
                  {order.active
                    ? new Date(order.orderConfirm).toLocaleDateString()
                    : "###"}
                </p>
                <p>
                  Trạng thái:
                  <span
                    className={`order-status ${
                      order.active ? "delivered" : "pending"
                    }`}
                  >
                    {order.active ? "Đã giao hàng" : "Chưa giao hàng"}
                  </span>
                </p>

                {order.order_details.map((detail) => (
                  <div className="product-his" key={detail.product_id}>
                    <div className="product-info-his">
                      <div className="product-info-left-his">
                        <img
                          src={`/images/${detail.imageProduct}`}
                          alt={detail.product_name}
                        />
                        <p className="product-name-his">
                          {detail.product_name}
                        </p>
                      </div>
                      <div className="price-details-his">
                        <p className="product-price-his">{detail.price} VND</p>
                      </div>
                    </div>
                    <p className="product-quantity-his">
                      Số lượng: {detail.quantity}
                    </p>
                  </div>
                ))}

                {/* Tổng cộng và thao tác */}
                <div className="order-total-his">
                  <p className="total-amount-his">
                    Thành tiền: {order.totalAmount} VND
                  </p>
                  <div className="action-buttons-his">
                    <button className="view-details-btn-his">Đặt lại</button>
                    <button className="reorder-btn-his">
                      Liên hệ với người bán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có đơn hàng nào trong lịch sử.</p>
        )}

        <div className="support-his">
          <p>
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng{" "}
            <a href="tel:18001234">liên hệ hỗ trợ</a> qua số điện thoại: 1800
            1234
          </p>
          <p>
            Hoặc gửi email đến{" "}
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
