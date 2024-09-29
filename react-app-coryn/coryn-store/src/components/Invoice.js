import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orderApi from "../api/orderApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';

export default function Invoice() {
  const params = useParams();
  const navigate= useNavigate();
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    fetchInfOrder();
  }, [params.orderId]);

  const handlExit =()=>{
   navigate("/employee/order-manager")
  }

  
  const downloadInvoice = () => {
    const input = document.getElementById("invoice_wrapper");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Width of the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Xuất PDF dưới dạng blob và sử dụng FileSaver.js
      const blob = pdf.output("blob"); // No need for .then here
      saveAs(blob, `invoice_order#${order ? order.id : "unknown"}.pdf`);
    });
  };
  
  useEffect(() => {
    fetchInfOrder();
  }, [params.orderId]);

  const fetchInfOrder = async () => {
    try {
      const orderResponse = await orderApi.getOrderComfirmInvoice(
        parseInt(params.orderId, 10)
      );
      setOrder(orderResponse.data);
      const orderDetailResponse = await orderApi.getOrderDetail(
        parseInt(params.orderId, 10)
      );
      setOrderDetail(orderDetailResponse.data);

      console.log(orderResponse.data);
      console.log(orderDetailResponse.data);
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  const currentDate = new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Nếu bạn muốn định dạng 24 giờ
  });
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }

  return (
    <>
      <div className="invoice-1-invo invoice-content-invo">
        <div className="container-invo container">
          <div className="row">
            <div className="col-lg-12">
              <div className="invoice-inner-invo clearfix">
                <div
                  className="invoice-info-invo clearfix"
                  id="invoice_wrapper"
                >
                  <div className="invoice-header-invo">
                    <div className="row g-0">
                      <div className="col-sm-6">
                        <div className="invoice-logo-invo">
                          <div className="logo">
                            <h2>Coryn Store</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 invoice-id-invo">
                        <div className="info-invo">
                          <h1 className="color-white-invo inv-header-1-invo">
                            Hóa đơn
                          </h1>
                          <p className="color-white-invo mb-1">
                            Mã đơn hàng:{" "}
                            <span>#{order ? order.id : "N/A"}</span>
                          </p>
                          <p className="color-white-invo mb-0 mb-0-invo">
                            Ngày tạo: <span>{currentDate}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thêm thông tin người dùng ở đây nếu cần */}
                  <div className="invoice-top-invo">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="invoice-number mb-30-invo">
                          <h4 className="inv-title-1-invo">
                            Thông tin đơn hàng
                          </h4>
                          <h2 className="name mb-10-invo">
                            Mã đơn hàng: #{order ? order.id : "N/A"}
                          </h2>
                          <p className="invo-addr-1-invo">
                            Ngày đặt hàng:{" "}
                            {order ? formatDate(order.order_date) : "N/A"}{" "}
                            <br />
                            Ngày hoàn thành:{" "}
                            {order
                              ? formatDate(order.order_confirm)
                              : "N/A"}{" "}
                            <br />
                            Phương thức thanh toán:{" "}
                            {order ? order.payment_methods : "N/A"} <br />
                            Địa chỉ nhận hàng:{" "}
                            {order ? order.billing_address : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="invoice-number mb-30-invo">
                          <div className="invoice-number-inner-invo">
                            <h4 className="inv-title-1-invo">
                              Thông tin khách hàng
                            </h4>
                            <h2 className="name mb-10-invo">
                              {order ? order.user_name : "N/A"}
                            </h2>
                            <p className="invo-addr-1-invo">
                              {order ? formatDate(order.birth_date) : "N/A"}
                              <br />
                              {order ? order.phone : "N/A"} <br />
                              {order ? order.email : "N/A"}
                              <br />
                              {order ? order.user_address : "N/A"} <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ... */}

                  <div className="invoice-center-invo">
                    {/* Hiển thị chi tiết đơn hàng */}
                    <div className="table-responsive">
                      <table className="mb-0-invo mb-0 table-invo table-striped invoice-table-invo">
                        <thead className="bg-active-invo">
                          <tr className="tr">
                            <th>No.</th>
                            <th className="pl0-invo text-start">
                              Tên sản phẩm
                            </th>
                            <th className="text-center">Giá (VNĐ)</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-end">Tổng (VNĐ)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetail.length > 0 ? (
                            orderDetail.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <span>{index + 1}</span>
                                </td>
                                <td className="pl0-invo">
                                  {item.product_name}
                                </td>
                                <td className="text-center">
                                  {item.price * (1 - item.discount / 100)}
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-end">
                                  {(
                                    item.price *
                                    (1 - item.discount / 100) *
                                    item.quantity
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No order details available
                              </td>
                            </tr>
                          )}
                          <tr className="tr2">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-center">Tổng cộng</td>
                            <td className="text-end">
                              {order
                                ? order.total_amount - order.shipper_fee
                                : "N/A"}{" "}
                              VNĐ
                            </td>
                          </tr>
                          <tr className="tr2">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-center">Phí vận chuyển</td>
                            <td className="text-end">
                              {order ? order.shipper_fee : "N/A"} VNĐ
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-center f-w-600 active-color-invo">
                              Thành tiền
                            </td>
                            <td className="f-w-600 text-end active-color-invo">
                              {order ? order.total_amount : "N/A"} VNĐ
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="invoice-bottom-invo">
                    <div className="row">
                      <div className="col-lg-6 col-md-8 col-sm-7">
                        <div className="mb-30 dear-client-invo">
                          <h3 className="inv-title-1-invo">Liên hệ & hỗ trợ</h3>
                          <p>
                            Hóa đơn này xác nhận rằng đơn hàng của bạn đã được
                            xử lý thành công. Chúng tôi hy vọng bạn hài lòng với
                            sản phẩm và dịch vụ của chúng tôi!"
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-4 col-sm-5">
                        <div className="mb-30 payment-method-invo">
                          <h3 className="inv-title-1-invo">
                            Phương thức thanh toán
                          </h3>
                          <ul className="payment-method-list-1 text-14">
                            <li>
                              <strong>Loại hình:</strong>{" "}
                              {order ? order.payment_methods : "N/A"}
                            </li>
                            <li>
                              <strong>Tên khách hàng:</strong>{" "}
                              {order ? order.user_name : "N/A"}
                            </li>
                            <li>
                              <strong>Ngày thành công:</strong>{" "}
                              {order ? formatDate(order.order_confirm) : "N/A"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-contact-invo clearfix">
                    <div className="row g-0">
                      <div className="col-lg-9 col-md-11 col-sm-12">
                        <div className="contact-info-invo">
                          <a href="tel:+55-4XX-634-7071">
                            <i className="fa fa-phone"></i> +84 972 614 451
                          </a>
                          <a href="mailto:info@themevessel.com">
                            <i className="fa fa-envelope"></i>{" "}
                            nguyenvankiet25112003@gmail.com
                          </a>
                          <a
                            href="https://maps.google.com?q=169 Teroghoria, Bangladesh"
                            className="mr-0 d-none-580"
                          >
                            <i className="fa fa-map-marker"></i> Quận 12, Thành
                            phố Hồ Chí Minh
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-btn-section-invo clearfix d-print-none">
                  <a
                    href="javascript:window.print()"
                    className="btn btn-lg btn-print-invo"
                  >
                    <i className="fa fa-print"></i> Print Invoice
                  </a>
                  <a
                    id="invoice_download_btn"
                    onClick={downloadInvoice}
                    className="btn btn-lg btn-download-invo btn-theme"
                  >
                    <i className="fa fa-download"></i> Download Invoice
                  </a>
                  <a
                    id="invoice_download_btn"
                    onClick={handlExit}
                    className="btn btn-lg btn-exit-invo btn-download-invo btn-theme"
                  >
                    <i className="fa fa-sign-out"></i> Exit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
