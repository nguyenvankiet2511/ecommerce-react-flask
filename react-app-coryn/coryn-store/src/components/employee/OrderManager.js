import React, { useEffect, useState } from "react";
import FooterEmployee from "../layout/FooterEmployee";
import HeaderEmployee from "../layout/HeaderEmployee";
import orderApi from "../../api/orderApi";
import { Link } from "react-router-dom";

export default function OrderManager() {
  const [orderDefault, setOrderDefault] = useState([]);
  const [orderComfirm, setOrderComfirm] = useState([]);

  useEffect(() => {
    fetchOrderComfirm();
    fetchOrderDefault();
  }, []);

  const fetchOrderDefault = async () => {
    const orders = await orderApi.getOrderDefault();
    setOrderDefault(orders.data);
    console.log(orders.data);
  };

  const fetchOrderComfirm = async () => {
    const orders = await orderApi.getOrderComfirm();
    setOrderComfirm(orders.data);
    console.log(orders.data);
  };

  const handleConfirmOrder = async (id) => {
    try {
      await orderApi.updateActiveOrder(id);
      await fetchOrderDefault();
      await fetchOrderComfirm();
    } catch (error) {
      return;
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await orderApi.removeOrder(id);
      await fetchOrderDefault();
      await fetchOrderComfirm();
    } catch (error) {
      return;
    }
  };

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }

  return (
    <>
      <HeaderEmployee>
        <div className="container-order-emp">
          <section className="order-overview-emp">
            <h1 className="container-h1-emp">Order Overview</h1>
            <p className="description-emp">
              Here you can find a summary of all your recent orders and their
              status.
            </p>
          </section>

          <div className="row">
            <div className="col-md-12 customer-with-emp">
              <h2>Danh sách đơn hàng đặt</h2>
              <div className="search-container-order-emp">
                <input
                  type="text"
                  id="searchInput1"
                  className="form-control-emp"
                  placeholder="Search..."
                />
              </div>
              <div className="table-responsive-emp">
                <table
                  id="mytable1"
                  className="table-emp table-bordered-emp table-striped-emp"
                >
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" id="checkall1" />
                      </th>
                      <th>Mã đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Địa chỉ</th>
                      <th>Vận chuyển</th>
                      <th>Phương thức</th>
                      <th>Tổng</th>
                      <th>Ngày đặt</th>
                      <th>Sửa</th>
                      <th>Xóa</th>
                      <th>Xác nhận</th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody-emp">
                    {orderDefault.map((order) => {
                      return (
                        <tr data-id="{order.id}">
                          <td>
                            <input type="checkbox" className="checkthis-emp" />
                          </td>
                          <td>{order.id}</td>
                          <td>{order.user_name}</td>
                          <td>{order.billing_address}</td>
                          <td>{order.shipper_name}</td>
                          <td>{order.payment_methods}</td>
                          <td>{order.total_amount} VND</td>
                          <td>{order.order_date}</td>
                          <td>
                            <Link to={`/employee/order-detail/${order.id}`}>
                              <button
                                className="btn btn-primary btn-xs edit-btn-emp"
                                data-id="1"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-xs delete-btn-emp"
                              data-id="1"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning btn-xs confirm-btn-emp"
                              data-id={order.id}
                              onClick={() => handleConfirmOrder(order.id)}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="button-container-emp">
            <button id="deleteSelected1" className="btn-1-emp btn-danger mb-3">
              Xóa đã chọn
            </button>
            <button
              id="confirmSelected1"
              className="btn-2-emp btn-warning mb-3"
            >
              Xác nhận
            </button>
          </div>

          <div className="container-order1-emp">
            <div className="row">
              <div className="col-md-12 customer-with-emp">
                <h2>Danh sách đơn hàng thành công</h2>
                <div className="search-container-order-emp">
                  <input
                    type="text"
                    id="searchInput2"
                    className="form-control-emp"
                    placeholder="Search..."
                  />
                </div>
                <div className="table-responsive-emp">
                  <table
                    id="mytable2"
                    className="table-emp table-bordered-emp table-striped-emp"
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Mã đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Nhân viên</th>
                        <th>Địa chỉ</th>
                        <th>Vận chuyển</th>
                        <th>Phương thức</th>
                        <th>Tổng (VNĐ)</th>
                        <th>Ngày đặt</th>
                        <th>Ngày xác nhận</th>
                      </tr>
                    </thead>
                    <tbody className="table-tbody-emp">
                      {orderComfirm.map((order) => {
                        return (
                          <tr data-id="{order.id}">
                            <td>
                              <Link to={`/invoice/${order.id}`}>
                                <button className="btn btn-primary btn-xs print-btn-emp">
                                  <i className="fa fa-print"></i> In hóa đơn
                                </button>
                              </Link>
                            </td>
                            <td>{order.id}</td>
                            <td>{order.user_name}</td>
                            <td>Đỗ Thị F</td>
                            <td>{order.billing_address || "---"}</td>
                            <td>{order.shipper_name || "---"}</td>
                            <td>{order.payment_methods}</td>
                            <td>{order.total_amount}</td>
                            <td>{formatDate(order.order_date)}</td>
                            <td>{formatDate(order.order_comfirm)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterEmployee />
      </HeaderEmployee>
    </>
  );
}
