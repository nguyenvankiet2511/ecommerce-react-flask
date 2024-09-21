import React from "react";
import FooterEmployee from "../layout/FooterEmployee";
import HeaderEmployee from "../layout/HeaderEmployee";

export default function OrderManager() {
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
                    <tr data-id="1">
                      <td>
                        <input type="checkbox" className="checkthis-emp" />
                      </td>
                      <td>1</td>
                      <td>Nguyễn Văn A</td>
                      <td>123 Đường A, Hà Nội, Việt Nam</td>
                      <td>VNPost</td>
                      <td>Thẻ Tín Dụng</td>
                      <td>5,000,000 VND</td>
                      <td>28-08-2024</td>
                      <td>
                        <button
                          className="btn btn-primary btn-xs edit-btn-emp"
                          data-id="1"
                        >
                          <i className="fa fa-pencil-alt"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-xs delete-btn-emp"
                          data-id="1"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-xs confirm-btn-emp"
                          data-id="1"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      </td>
                    </tr>
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
                        <th>Mã đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Nhân viên</th>
                        <th>Địa chỉ</th>
                        <th>Vận chuyển</th>
                        <th>Phương thức</th>
                        <th>Tổng</th>
                        <th>Ngày đặt</th>
                        <th>Ngày xác nhận</th>
                      </tr>
                    </thead>
                    <tbody className="table-tbody-emp">
                      <tr data-id="3">
                        <td>3</td>
                        <td>Phạm Văn E</td>
                        <td>Đỗ Thị F</td>
                        <td>789 Đường C, Đà Nẵng, Việt Nam</td>
                        <td>Viettel Post</td>
                        <td>Chuyển Khoản Ngân Hàng</td>
                        <td>4,100,000 VND</td>
                        <td>28-08-2024</td>
                        <td>28-08-2024</td>
                      </tr>
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
