import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
