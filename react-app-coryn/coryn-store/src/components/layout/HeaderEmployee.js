import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderEmployee({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Hàm toggle mở/đóng sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="wrapper-container">
        <nav id="sidebar-emp" className={isOpen ? "open" : ""}>
          <div className="sidebar-content-emp">
            <Link className="sidebar-brand-emp" to="/employee">
              <span>CORYN STORE</span>
            </Link>
            <ul className="sidebar-nav-emp">
              <li className="sidebar-header-emp">Pages</li>
             
              <li className="sidebar-item-emp active">
                <Link className="sidebar-link-emp" to="/employee">
                  <i className="fa-solid fa-house"></i> <span>Trang chủ</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/employee/profile">
                  <i className="fa-solid fa-user"></i> <span>Hồ sơ</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/customercare">
                  <i className="fa-solid fa-headset"></i>{" "}
                  <span>Chăm sóc khách hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/employee/order-manager">
                  <i className="fa-solid fa-user-plus"></i>{" "}
                  <span>Quản lý đơn hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/employee/payment">
                  <i className="fa-solid fa-file-invoice"></i>{" "}
                  <span>Thanh toán đơn hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="#">
                  <i className="fa-solid fa-sign-in-alt"></i>{" "}
                  <span>Đăng xuất</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
          className="main-emp"
          style={{ marginLeft: isOpen ? "300px" : "0" }}
        >
          <nav className="navbar-emp">
            <div className="sidebar-toggle-emp" onClick={toggleSidebar}>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className="navbar-content-emp">
              <div className="search-container-emp">
                <button className="search-btn-emp">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                  type="text"
                  className="search-input-emp"
                  placeholder="Search..."
                />
              </div>
              <ul className="navbar-nav-emp">
                <li className="nav-item-emp dropdown">
                  <a className="nav-icon-emp" href="#" id="alertsDropdown">
                    <i className="fa-solid fa-bell"></i>
                    <span className="indicator-emp">4</span>
                  </a>
                </li>
                <li className="nav-item-emp dropdown">
                  <a className="nav-icon-emp" href="#" id="messagesDropdown">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>
                <li className="nav-item-emp dropdown">
                  <a className="nav-link profile-toggle-emp" href="#">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/avatar-01.jpg`}
                      alt="Charles Hall"
                      className="avatar-emp"
                    />

                    <span>Jesse</span>
                  </a>
                  <div className="dropdown-menu-emp">
                    <Link className="dropdown-item-emp" to="/employee/profile">
                      Hồ sơ
                    </Link>
                    <a className="dropdown-item-emp" href="#">
                      Phân tích
                    </a>
                    <a className="dropdown-item-emp" href="index.html">
                      Chính sách & Nội quy
                    </a>
                    <a className="dropdown-item-emp" href="#">
                      Hỗ trợ
                    </a>
                    <a className="dropdown-item-emp" href="#">
                      Đăng xuất
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
}
