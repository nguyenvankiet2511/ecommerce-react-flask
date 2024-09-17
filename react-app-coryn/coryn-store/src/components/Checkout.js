import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartProvider } from "./context/CartContext";
import addressApi from "../api/addressApi";
import orderApi from "../api/orderApi";

export default function Checkout() {
  const location = useLocation();
  const {
    totalAmount = 0,
    shippingFee = 0,
    totalDefault = 0,
    count = 0,
    shipperId = null,
    userId = 0,
    listCart= null
  } = location.state || {}; // Nhận dữ liệu từ state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(""); // Địa chỉ được chọn
  const [lAddress, setlAddress] = useState([null]);
  const [fisrtName, setFisrtName]= useState("");
  const [lastName, setLastName]= useState("");
  const [address, setAddress]= useState("");
  const [addressDetail, setAddressDetai]=useState("");
  const [phone, setPhone]= useState("");
  const [email, setEmail]= useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleFisrtNameChange = (e) => {
    setFisrtName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressEnterhange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressDetailChange = (e) => {
    setAddressDetai(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };


  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const address = await addressApi.getAddressById(userId);
    setlAddress(address.data);
    console.log(address.data);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!fisrtName || !lastName || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    // Prepare data to send
    const data = {
      name: fisrtName + lastName,
      phone: phone,
      address: address,
      addressDetail: addressDetail,
      customerId: userId,
    };
  
    try {
      // Send data to the API
      const response = await addressApi.addAddress(data);
      console.log(response.data);
      fetchAddress();
  
      setFisrtName("");
      setLastName("");
      setAddress("");
      setAddressDetai(""); 
      setPhone("");
      setCountry("");
      setEmail("");
      setMessage(response.data.message); 
      setError("");
  
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };
  

  const handlePayment = () => {
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ nhận hàng.");
      return;
    }

    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    if (!termsAccepted) {
      alert("Vui lòng chấp nhận các điều khoản và điều kiện.");
      return;
    }

    // Xử lý các luồng thanh toán riêng
    switch (paymentMethod) {
      case "Thanh toán khi nhận hàng":
        handleCODPayment();
        break;
      case "Check Payment":
        handleCheckPayment();
        break;
      case "VNPAY":
        handleVNPAYPayment();
        break;
      default:
        alert("Phương thức thanh toán không hợp lệ.");
    }
  };

  // Xử lý thanh toán COD
  const handleCODPayment = async () => {
    alert("Bạn đã chọn Thanh toán khi nhận hàng.");
    
    // Chuẩn bị dữ liệu gửi
    const data = {
      customer_id: userId, 
      address_id: selectedAddress, 
      shipper_id: shipperId, 
      total: totalAmount, 
      paymentMethods: paymentMethod, 
      l_productId: listCart.map((item) => item.product_id), 
      l_quantity: listCart.map((item) => item.quantity), 
      l_cartId: listCart.map((item) => item.cart_id), 
    };
  
    console.log(data); 
  
    try {
     
      const response = await orderApi.addOrderByCustomer(data);
  
      if (response.status === 200) { 
        alert('Đã đặt hàng thành công!');
      } else {
        alert('Đặt hàng không thành công!');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };
  

  // Xử lý thanh toán bằng Check Payment
  const handleCheckPayment = () => {
    alert("Bạn đã chọn Check Payment.");
    // Thêm logic xử lý cho Check Payment (ví dụ: hướng dẫn gửi check, xác nhận với hệ thống, etc.)
  };

  // Xử lý thanh toán qua VNPAY
  const handleVNPAYPayment = () => {
    alert("Bạn đã chọn VNPAY.");
    // Thêm logic xử lý cho VNPAY (ví dụ: chuyển hướng tới cổng thanh toán VNPAY, xử lý callback, etc.)
  };

  return (
    <>
      <CartProvider>
        <Header />
        <div>
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10 ">
                  {/* Form địa chỉ */}
                  <form  className="billing-form" onSubmit={handleSubmit}>
                    <h3 className="mb-4 billing-heading">Thông tin địa chỉ</h3>
                    <div className="row align-items-end">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstname">Họ</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={fisrtName}
                            onChange={handleFisrtNameChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lastname">Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={lastName}
                            onChange={handleLastNameChange}
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                     
                      <div className="w-100"></div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="streetaddress">
                            Địa chỉ nhận hàng
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập địa chỉ nhận hàng"
                            value={address}
                            onChange={handleAddressEnterhange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="streetaddress">
                           Địa chỉ chi tiết
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập chi tiết địa chỉ"
                            value={addressDetail}
                            onChange={handleAddressDetailChange}
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="towncity">Thành phố</label>
                          <input
                            type="text"
                            className="form-control"
                            value={country}
                            placeholder=""
                            onChange={handleCountryChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="postcodezip">Mã ZIP</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(*) Không bắt buộc"
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="emailaddress">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            placeholder=""
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-primary py-3 px-4 btn-co"
                          >
                            Tạo địa chỉ nhận hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form action="#" className="billing-form margin-top-co">
                    <h3 className="mb-4 billing-heading">Địa chỉ giao hàng</h3>
                    <div className="row align-items-end">
                      <div className="w-100"></div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="select-wrap">
                            <div className="icon">
                              <span className="ion-ios-arrow-down"></span>
                            </div>
                            <select
                              name="country"
                              id="country"
                              className="form-control"
                              value={selectedAddress} // Giá trị của địa chỉ được chọn
                              onChange={handleAddressChange} // Cập nhật địa chỉ được chọn
                            >
                              <option value="" disabled selected>
                                Chọn địa chỉ nhận hàng
                              </option>
                              {lAddress && lAddress.length > 0 ? (
                                lAddress.map((address, index) =>
                                  address ? (
                                    <option key={index} value={address.id}>
                                      {`${address.name} - ${address.phone} - ${address.address}`}
                                    </option>
                                  ) : null
                                )
                              ) : (
                                <option value="">Không có địa chỉ nào</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="row mt-5 pt-3 d-flex">
                    <div className="col-md-6 d-flex">
                      <div className="cart-detail cart-total bg-light p-3 p-md-4">
                        <h3 className="billing-heading mb-4">Tổng đơn hàng</h3>
                        <p className="d-flex">
                          <span>Tổng cộng</span>
                          <span>{totalDefault.toFixed(2)} VND</span>
                        </p>
                        <p className="d-flex">
                          <span>Phí vận chuyển</span>
                          <span>{shippingFee.toFixed(2)} VND</span>
                        </p>
                        <p className="d-flex">
                          <span>Giảm giá</span>
                          <span>
                            {(
                              ((totalDefault - totalAmount) / totalDefault) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </p>
                        <p className="d-flex">
                          <span>Số lượng mặt hàng</span>
                          <span>{count}</span>
                        </p>
                        <hr />
                        <p className="d-flex total-price">
                          <span>Thành tiền</span>
                          <span>
                            {(totalAmount + shippingFee).toFixed(2)} VND
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="cart-detail bg-light p-3 p-md-4">
                        <h3 className="billing-heading mb-4">
                          Phương thức thanh toán
                        </h3>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="Thanh toán khi nhận hàng"
                                  onChange={handlePaymentMethodChange}
                                  className="mr-2"
                                />{" "}
                                Thanh toán khi nhận hàng
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="Check Payment"
                                  onChange={handlePaymentMethodChange}
                                  className="mr-2"
                                />{" "}
                                Check Payment
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="VNPAY"
                                  onChange={handlePaymentMethodChange}
                                  className="mr-2"
                                />{" "}
                                VNPAY
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  onChange={handleTermsChange}
                                />
                                Tôi đã đọc và chấp nhận các điều khoản và điều
                                kiện
                              </label>
                            </div>
                          </div>
                        </div>
                        <p>
                          <button
                            type="button"
                            className="btn btn-primary py-3 px-4"
                            onClick={handlePayment}
                          >
                            Thanh toán
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </CartProvider>
    </>
  );
}
