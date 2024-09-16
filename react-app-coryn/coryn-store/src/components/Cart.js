import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cartApi from "../api/cartApi";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartProvider } from "./context/CartContext";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [totalAmount,setTotalAmount] = useState(0);
  const [count,setCount] = useState([null]);
  const [totalAmountDefault,setTotalAmountDefault] = useState(0);
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    fetchCarts();
    fetchCountCart();
  }, []);

  const removeCart = async (id) => {
    try {
      await cartApi.removeCart(id);
      // Refresh cart after removing
      fetchCarts();
      fetchCountCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const fetchCountCart = async () =>{
    const count = await cartApi.getCountCartByUserId(user_id);
    setCount(count.data)
  };
  const fetchCarts = async () => {
    const carts = await cartApi.getCartByUserId(user_id);
    setCarts(carts.data);
    calculateTotalDefault(carts.data);
    calculateTotal(carts.data);
    console.log(carts.data);
  };

  const calculateTotalDefault = (carts) => {
    let total = 0;
    carts.forEach((cart) => {
      const discountedPrice = cart.product_price ;
      total += discountedPrice * cart.quantity;
    });
    setTotalAmountDefault(total);
  };
  const calculateTotal = (carts) => {
    let total = 0;
    carts.forEach((cart) => {
      const discountedPrice = cart.product_price * (1 - cart.product_discount / 100);
      total += discountedPrice * cart.quantity;
    });
    setTotalAmount(total);
  };

  return (
    <>
    <CartProvider>
      <Header />
      <div>
        <section className="ftco-section ftco-cart">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="cart-list">
                  <table className="table">
                    <thead className="thead-primary">
                      <tr className="text-center">
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá </th>

                        <th>Số lượng</th>
                        <th>Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((cart) => {
                        // Tính giá sau giảm giá
                        const discountedPrice =
                          cart.product_price *
                          (1 - cart.product_discount / 100);
                        // Tính tổng giá
                        const totalPrice = discountedPrice * cart.quantity;
                        const img = cart.product_images;

                        return (
                          <tr
                            key={cart.cart_id}
                            className="text-center boder-cart"
                          >
                            <td className="product-remove">
                              <a href="#" onClick={() => removeCart(cart.cart_id)}>
                                <span className="ion-ios-close"></span>
                              </a>
                            </td>
                            <td className="image-prod">
                              <div
                                className="img"
                                style={{
                                  backgroundImage: `url(images/${cart.product_images})`,
                                }}
                              ></div>
                            </td>
                            <td className="product-name">
                              <h3>{cart.product_name}</h3>
                              <p>{cart.product_description}</p>
                            </td>
                            <td className="price">
                              {discountedPrice.toFixed(2)} VND
                            </td>

                            <td className="quantity">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  name="quantity"
                                  className="quantity form-control input-number"
                                  value={cart.quantity}
                                  min="1"
                                  max="100"
                                />
                              </div>
                            </td>
                            <td className="total">
                              {totalPrice.toFixed(2)} VND
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col col-lg-5 col-md-6 mt-5 cart-wrap ">
                <div className="cart-total mb-3">
                  <h3>Đơn hàng tạm tính</h3>
                  <p className="d-flex">
                    <span>Tổng cộng</span>
                    <span>{totalAmountDefault.toFixed(2)} VND</span>
                  </p>
                  <p className="d-flex">
                    <span>Phí vận chuyển</span>
                    <span>$0.00</span>
                  </p>
                  <p className="d-flex">
                    <span>Giảm giá</span>
                    <span>{(((totalAmountDefault - totalAmount) / totalAmountDefault) * 100).toFixed(2)}%</span>


                  </p>
                  <p className="d-flex">
                    <span>Số lượng mặt hàng</span>
                    <span>{count.cart_count}</span>
                  </p>
                  <hr />
                  <p className="d-flex total-price">
                    <span>Tổng thanh toán</span>
                    <span>$17.60</span>
                  </p>
                </div>

                <p className="text-center">
                  <Link to="/checkout" className="btn btn-primary py-3 px-4">
                    Mua hàng
                  </Link>
                </p>
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
