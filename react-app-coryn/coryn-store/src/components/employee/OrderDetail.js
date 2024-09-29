import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";
import orderApi from "../../api/orderApi";

export default function OrderDetail() {
  const params = useParams();
  const [isConfirm, setIsConfirm] = useState(false);
  const [order, setOrder] = useState([null]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderData, setOrderData] = useState({
    orderId: "",
    orderDate: "",
    status: "",
    shippingAddress: "",
    paymentMethod: "",
    recipientName: "",
    contactNumber: "",
    totalAmount: "",
  });

  useEffect(() => {
    fetchInfOrder();
  }, [params.orderId]);

  const fetchInfOrder = async () => {
    try {
      const orderResponse = await orderApi.getOrderComfirmInvoice(
        parseInt(params.orderId, 10)
      );
      setOrder(orderResponse.data);
      setIsConfirm(orderResponse.data.active);
      const orderDetailResponse = await orderApi.getOrderDetail(
        parseInt(params.orderId, 10)
      );
      setOrderDetail(orderDetailResponse.data);

      const formattedDate = new Date(orderResponse.data.order_date);
      const dateString = formattedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      setOrderData({
        orderId: orderResponse.data.id || "",
        orderDate: dateString || "",
        status: orderResponse.data.active ? "Hoàn thành" : "Chưa hoàn thành",
        shippingAddress: orderResponse.data.billing_address || "",
        paymentMethod: orderResponse.data.payment_methods || "",
        recipientName: orderResponse.data.user_name || "",
        contactNumber: orderResponse.data.phone || "",
        totalAmount: orderResponse.data.total_amount || "",
      });
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleChangeDetail = (e, index, field) => {
    const updatedOrderDetail = [...orderDetail];
    updatedOrderDetail[index][field] = e.target.value;
    setOrderDetail(updatedOrderDetail);
  };

  const handleDelete = async (id) => {
    try {
      await orderApi.removeOrderDetail(id);
      const updatedOrderDetail = orderDetail.filter((order) => order.id !== id);
      setOrderDetail(updatedOrderDetail);
    } catch (error) {
      console.error("Failed to delete order detail:", error);
    }
  };

  const updateOrderDetail = async (event) => {
    event.preventDefault();

    if (!orderDetail || orderDetail.length === 0) {
      console.error("orderDetail is empty or not defined");
      return;
    }

    const data = {
      orderId: params.orderId,
      lOrderDetailId: orderDetail.map((item) => item.id),
      lQuantity: orderDetail.map((item) => item.quantity),
      lPrice: orderDetail.map((item) => item.price),
      lDiscount: orderDetail.map((item) => item.discount),
    };
    console.log(data);

    try {
      await orderApi.updateOrderDetail(data);
      alert("Chỉnh sửa đơn hàng thành công!");
    } catch (error) {
      alert("Chỉnh sửa đơn hàng đơn không thành công! Hãy thử lại.");
    }
  };

  const handleViewOrder = () => {
    alert("Order details viewed successfully!");
  };

  return (
    <>
      <HeaderEmployee>
        <div className="container-emp">
          <h1 className="name-order-emp">Chi tiết đơn hàng</h1>

          <section className="order-info-emp">
            <h2>Thông tin đơn hàng</h2>
            <div className="order-details-emp" id="update-progress-emp">
              <div className="form-group-emp">
                <label>Mã đơn hàng:</label>
                <input
                  type="text"
                  name="orderId"
                  value={orderData.orderId}
                  onChange={handleInputChange}
                  className="input-emp"
                  readOnly
                />
              </div>

              <div className="form-group-emp">
                <label>Ngày đặt:</label>
                <input
                  type="date"
                  name="orderDate"
                  value={orderData.orderDate}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Trạng thái:</label>
                <input
                  type="text"
                  name="status"
                  value={orderData.status}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Địa chỉ nhận hàng:</label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={orderData.shippingAddress}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Phương thức thanh toán:</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={orderData.paymentMethod}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Tên khách hàng:</label>
                <input
                  type="text"
                  name="recipientName"
                  value={orderData.recipientName}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={orderData.contactNumber}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>

              <div className="form-group-emp">
                <label>Tổng:</label>
                <input
                  type="text"
                  name="totalAmount"
                  value={orderData.totalAmount}
                  onChange={handleInputChange}
                  className="input-emp"
                />
              </div>
            </div>
          </section>

          <section className="order-tracking-emp">
            <h2>Chi tiết đơn hàng</h2>
            <div className="table-responsive-emp">
              <table
                id="mytable2"
                className="table-emp table-bordered-emp table-striped-emp"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Mã chi tiết đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá (VNĐ)</th>
                    <th>Giảm giá (%)</th>
                  </tr>
                </thead>
                <tbody className="table-tbody-emp">
                  {orderDetail.map((order, index) => (
                    <tr key={order.id}>
                      <td>
                        {isConfirm ? null : (
                          <button
                            className="btn btn-danger btn-xs delete-btn-emp"
                            onClick={() => handleDelete(order.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                      <td>{order.id}</td>
                      <td>
                        {isConfirm ? (
                          <span>{order.product_name}</span>
                        ) : (
                          <input
                            type="text"
                            value={order.product_name}
                            onChange={(e) =>
                              handleChangeDetail(e, index, "product_name")
                            }
                          />
                        )}
                      </td>
                      <td>
                        {isConfirm ? (
                          <span>{order.quantity}</span>
                        ) : (
                          <input
                            type="number"
                            value={order.quantity}
                            onChange={(e) =>
                              handleChangeDetail(e, index, "quantity")
                            }
                          />
                        )}
                      </td>
                      <td>
                        {isConfirm ? (
                          <span>{order.price}</span>
                        ) : (
                          <input
                            type="number"
                            value={order.price}
                            onChange={(e) =>
                              handleChangeDetail(e, index, "price")
                            }
                          />
                        )}
                      </td>
                      <td>
                        {isConfirm ? (
                          <span>{order.discount}</span>
                        ) : (
                          <input
                            type="number"
                            value={order.discount}
                            onChange={(e) =>
                              handleChangeDetail(e, index, "discount")
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a
                href="#"
                id="update-button-emp"
                className="button-success-emp"
                onClick={isConfirm ? handleViewOrder : updateOrderDetail}
              >
                {isConfirm ? "Hoàn thành xem đơn hàng" : "Cập nhật thành công"}
              </a>
            </div>
          </section>
        </div>
        <FooterEmployee />
      </HeaderEmployee>
    </>
  );
}
