import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartApi from "../api/cartApi";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartProvider } from "./context/CartContext";
import shipperApi from "../api/shipperApi";

export default function Cart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState({ cart_count: 0 });
  const [totalAmountDefault, setTotalAmountDefault] = useState(0);
  const [shippers, setShippers] = useState([]);
  const [selectedShippingFee, setSelectedShippingFee] = useState(0);
  const [shipperId, setShipperId] = useState(0);
  const [isShippingSelected, setIsShippingSelected] = useState(false);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetchCarts();
    fetchCountCart();
    fetchShipper();
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

  const fetchCountCart = async () => {
    const count = await cartApi.getCountCartByUserId(user_id);
    setCount(count.data);
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
      const discountedPrice = cart.product_price;
      total += discountedPrice * cart.quantity;
    });
    setTotalAmountDefault(total);
  };

  const calculateTotal = (carts) => {
    let total = 0;
    carts.forEach((cart) => {
      const discountedPrice =
        cart.product_price * (1 - cart.product_discount / 100);
      total += discountedPrice * cart.quantity;
    });
    setTotalAmount(total);
  };

  const fetchShipper = async () => {
    const shippers = await shipperApi.getAll();
    setShippers(shippers.data);
  };

  const handleShippingChange = (fee, id) => {
    setSelectedShippingFee(fee);
    setShipperId(id);
    setIsShippingSelected(true);
    console.log(fee);
  };

  const handleQuantityChange = (e, cart) => {
    const newQuantity = Math.max(1, Math.min(100, Number(e.target.value)));
    const updatedCarts = carts.map((item) =>
      item.cart_id === cart.cart_id ? { ...item, quantity: newQuantity } : item
    );
    setCarts(updatedCarts);
    changeQuantityCart(cart.cart_id, newQuantity, updatedCarts);
  };

  const changeQuantityCart = async (cartId, newQuantity, updatedCarts) => {
    const data = {
      cartId: cartId,
      quantity: newQuantity,
    };

    try {
      await cartApi.updateQuantityCart(data);
      // Recalculate totals based on updatedCarts
      calculateTotal(updatedCarts);
      calculateTotalDefault(updatedCarts);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleCheckout = () => {
    if (count.cart_count === 0) {
      const userConfirmed = window.confirm(
        "Giỏ hàng của bạn đang trống. Bạn có muốn xem sản phẩm không?"
      );
      if (userConfirmed) {
        navigate("/category/-1");
        return;
      } else {
        return;
      }
    }
    if (!isShippingSelected) {
      alert("Vui lòng chọn phương thức vận chuyển trước khi tiếp tục!");
      return;
    }
    navigate("/checkout", {
      state: {
        totalDefault: totalAmountDefault,
        totalAmount: totalAmount,
        shippingFee: selectedShippingFee,
        shipperId: shipperId,
        count: count.cart_count,
        userId: user_id,
        listCart: carts,
      },
    });
  };

  return (
    <>
      <CartProvider>
        <Header />
        <div>
          <section className="ftco-section ftco-cart">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
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
                          const discountedPrice =
                            cart.product_price *
                            (1 - cart.product_discount / 100);
                          const totalPrice = discountedPrice * cart.quantity;

                          return (
                            <tr
                              key={cart.cart_id}
                              className="text-center boder-cart"
                            >
                              <td className="product-remove">
                                <a
                                  href="#"
                                  onClick={() => removeCart(cart.cart_id)}
                                >
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
                                    type="number"
                                    name="quantity"
                                    className="quantity form-control input-number"
                                    value={
                                      carts.find(
                                        (item) => item.cart_id === cart.cart_id
                                      )?.quantity || 1
                                    }
                                    min="1"
                                    max="100"
                                    onChange={(e) =>
                                      handleQuantityChange(e, cart)
                                    }
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
              <div className="row mt-5 pt-3 d-flex">
                <div className="col-md-6 d-flex">
                  <div className="cart-detail cart-total bg-light p-3 p-md-4">
                    <h3 className="billing-heading mb-4">Đơn hàng tạm tính</h3>
                    <p className="d-flex">
                      <span>Tổng cộng</span>
                      <span>{totalAmountDefault.toFixed(2)} VND</span>
                    </p>
                    <p className="d-flex">
                      <span>Phí vận chuyển</span>
                      <span>
                        {selectedShippingFee
                          ? selectedShippingFee.toFixed(2)
                          : "0.00"}{" "}
                        VND
                      </span>
                    </p>
                    <p className="d-flex">
                      <span>Giảm giá</span>
                      <span>
                        {" "}
                        {(
                          ((totalAmountDefault - totalAmount) /
                            totalAmountDefault) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </p>
                    <p className="d-flex">
                      <span>Số lượng mặt hàng</span>
                      <span>{count.cart_count}</span>
                    </p>
                    <hr />
                    <p className="d-flex total-price">
                      <span>Thành tiền</span>
                      <span>
                        {(totalAmount + selectedShippingFee).toFixed(2)} VND
                      </span>
                    </p>
                    <p className="text-center">
                      <button
                        onClick={handleCheckout}
                        className="btn btn-primary py-3 px-4"
                      >
                        Mua hàng
                      </button>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cart-detail bg-light p-3 p-md-4">
                    <h3 className="billing-heading mb-4">Đơn vị vận chuyển</h3>
                    {shippers.map((shipper) => {
                      return (
                        <div className="form-group" key={shipper.id}>
                          <div className="col-md-12">
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  name="optradio"
                                  className="mr-2"
                                  onChange={() =>
                                    handleShippingChange(
                                      shipper.fee,
                                      shipper.id
                                    )
                                  }
                                />{" "}
                                {shipper.companyName}
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
