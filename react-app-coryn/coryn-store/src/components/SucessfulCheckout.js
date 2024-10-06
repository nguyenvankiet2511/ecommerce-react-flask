import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { CartProvider} from "./context/CartContext";
export default function SucessfulCheckout() {
  return (
    <>
     <CartProvider>
      <Header />
      <div>
        <div className="success-container">
          <div className="success-message">
            <div className="icon-container">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Đặt Hàng Thành Công!</h3>
            <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>

            <div className="button-container">
              <a href="/" className="btn-success"> 
                Quay lại Trang Chủ
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </CartProvider>
    </>
  );
}
