import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default function CancelPaypal() {
  return (
    <>
    <CartProvider>
     <Header />
     <div>
       <div className="success-container">
         <div className="success-message">
           <div className="icon-container-cancel">
           <i className="fas fa-times"></i>
           </div>
           <h3>Bạn đã hủy phương thức thanh toán Paypal!</h3>
           <p>Cảm ơn bạn đã quan tâm cửa hàng của chúng tôi.</p>
           <div className="button-container cancel">
             <Link to={`/cart`} className="btn-success-cancel"> 
               Về trang giỏ hàng
             </Link>
           </div>
         </div>
       </div>
     </div>
   
  

     <Footer />
     </CartProvider>
   </>
  )
}





