import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Shop from "./components/Shop";
import OAuthCallback from "./components/OauthCallback";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/style.css";
import "./assets/css/header.css";
import "./assets/css/open-iconic-bootstrap.min.css";
import "./assets/css/animate.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/aos.css";
import "./assets/css/ionicons.min.css";
import "./assets/css/bootstrap-datepicker.css";
import "./assets/css/jquery.timepicker.css";
import "./assets/css/flaticon.css";
import "./assets/css/icomoon.css";
import "./assets/css/login.css";
import "./assets/css/profile.css";
import "./assets/css/style-employee.css";
import "./assets/css/invoice.css";
import "./assets/css/style-admin.css";
import "./assets/css/statistic.css";

import Products from "./components/Products";
import ScrollToTop from "./components/layout/ScrollToTop";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import About from "./components/About";
import { CartProvider } from "./components/context/CartContext"; // Import CartProvider
import Profile from "./components/Profile";
import SucessfulCheckout from "./components/SucessfulCheckout";
import HeaderEmployee from "./components/layout/HeaderEmployee";
import HomeEmployee from "./components/employee/HomeEmployee";
import ProfileEmployee from "./components/employee/ProfileEmployee";
import OrderManager from "./components/employee/OrderManager";
import Payment from "./components/employee/Payment";
import Invoice from "./components/Invoice";
import OrderDetail from "./components/employee/OrderDetail";
import HistoryOrder from "./components/HistoryOrder";
import CategoriesManager from "./components/admin/CategoriesManager";
import CreateCategory from "./components/admin/CreateCategory";
import HomeAdmin from "./components/admin/HomeAdmin";
import ProductsManager from "./components/admin/ProductsManager";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateCategory from "./components/admin/UpdateCategory";
import UpdateProduct from "./components/admin/UpdateProduct";
import AccountManager from "./components/admin/AccountManager";
import UpdateAccount from "./components/admin/UpdateAccount";
import CreateAccount from "./components/admin/CreateAccount";
import Statistic from "./components/admin/Statistic";
import PaymentCallback from "./components/PaymentExecute";
import PaymentPage from "./components/PaypalPayment";
import Chat from "./components/Chat";
import CustomerCare from "./components/employee/CustomerCare";
import ProfileAdmin from "./components/admin/ProfileAdmin";
import PayPalButton from "./components/PaypalPayment";
import PaymentExecute from "./components/PaymentExecute";
import CancelPaypal from "./components/CancelPaypal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/execute" element={<PaymentExecute/>} />
            <Route path="/cancel" element={<CancelPaypal/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<OAuthCallback />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-callback" element={<PaymentCallback />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />}>
              <Route path=":productId" element={<Products />} />
            </Route>
            <Route path="/category" element={<Shop />}>
              <Route path=":categoryId" element={<Shop />} />
            </Route>
            <Route path="/cart" element={<Cart />}>
              <Route path=":userId" element={<Cart />} />
            </Route>
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/chatbox" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/history" element={<HistoryOrder />} />
            <Route path="/sucessful-checkout" element={<SucessfulCheckout />} />
            <Route path="/employee" element={<HomeEmployee />} />
            <Route path="/employee/profile" element={<ProfileEmployee />} />
            <Route path="/employee/customer-care" element={<CustomerCare />} />
            <Route path="/employee/order-manager" element={<OrderManager />} />
            <Route path="/employee/payment" element={<Payment />} />
            <Route path="/invoice/" element={<Invoice />}>
              <Route path=":orderId" element={<Invoice />} />
            </Route>
            <Route
              path="/employee/order-detail/:orderId"
              element={<OrderDetail />}
            />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/profile" element={<ProfileAdmin />} />
            <Route
              path="/admin/category-manager"
              element={<CategoriesManager />}
            />
            <Route path="/admin/create-category" element={<CreateCategory />} />
            <Route
              path="/admin/update-category/:categoryId"
              element={<UpdateCategory />}
            />
            <Route
              path="/admin/product-manager"
              element={<ProductsManager />}
            />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route
              path="/admin/update-product/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/admin/account-manager" element={<AccountManager />} />
            <Route path="/admin/create-account" element={<CreateAccount />} />
            <Route
              path="/admin/update-account/:accountId"
              element={<UpdateAccount />}
            />
            <Route path="/admin/statistic" element={<Statistic />} />
          </Routes>
        </ScrollToTop>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Optionally, you can add reportWebVitals for performance measurement
reportWebVitals();
