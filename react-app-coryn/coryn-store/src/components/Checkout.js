import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartProvider } from "./context/CartContext";

export default function Checkout() {
  return (
    <>
      <CartProvider>
        <Header />
        <div>
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10 ">
                  <form action="#" className="billing-form">
                    <h3 className="mb-4 billing-heading">Thông tin địa chỉ</h3>
                    <div className="row align-items-end">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstname">Họ</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
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
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="country">Nơi sống</label>
                          <div className="select-wrap">
                            <div className="icon">
                              <span className="ion-ios-arrow-down"></span>
                            </div>
                            <select name="" id="" className="form-control">
                              <option value="">France</option>
                              <option value="">Italy</option>
                              <option value="">Philippines</option>
                              <option value="">South Korea</option>
                              <option value="">Hongkong</option>
                              <option value="">Japan</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-100"></div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="streetaddress">
                            Địa chỉ nhận hàng
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="House number and street name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Apartment, suite, unit etc: (optional)"
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
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="postcodezip">Mã ZIP</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
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
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="emailaddress">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="w-100"></div>
                    </div>
                  </form>

                  <div className="row mt-5 pt-3 d-flex">
                    <div className="col-md-6 d-flex">
                      <div className="cart-detail cart-total bg-light p-3 p-md-4">
                        <h3 className="billing-heading mb-4">Tổng đơn hàng</h3>
                        <p className="d-flex">
                          <span>Tổng cộng</span>
                          <span>$20.60</span>
                        </p>
                        <p className="d-flex">
                          <span>Phí vận chuyển</span>
                          <span>$0.00</span>
                        </p>
                        <p className="d-flex">
                          <span>Giảm giá</span>
                          <span>$3.00</span>
                        </p>
                        <p className="d-flex">
                          <span>Số lượng mặt hàng</span>
                          <span>$3.00</span>
                        </p>
                        <hr />
                        <p className="d-flex total-price">
                          <span>Thành tiền</span>
                          <span>$17.60</span>
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
                                <input type="checkbox" className="mr-2" />
                                Tôi đã đọc và chấp nhận các điều khoản và điều
                                kiện
                              </label>
                            </div>
                          </div>
                        </div>
                        <p>
                          <a href="#" className="btn btn-primary py-3 px-4">
                            Thanh toán
                          </a>
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
