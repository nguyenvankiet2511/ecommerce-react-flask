import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Shop from "./components/Shop";
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

import Products from "./components/Products";
import ScrollToTop from "./components/layout/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<Products />} />
          </Route>
          <Route path="/category" element={<Shop />}>
            <Route path=":categoryId" element={<Shop />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
);

// Optionally, you can add reportWebVitals for performance measurement
reportWebVitals();
