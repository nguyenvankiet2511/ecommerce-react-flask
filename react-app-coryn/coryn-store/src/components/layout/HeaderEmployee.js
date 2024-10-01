import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { isLoggedIn, deleteTokens, fetchProtectedData } from "../../api/authToken";
import accountsApi from "../../api/accountsApi";

export default function HeaderEmployee({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName]= useState("");
  const [user, setUser]= useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await accountsApi.getCurentUser();
        setName(response.data.logged_in_as.name);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
    fetchInfUser();
  }, []);
  
  const fetchInfUser= async ()=>{
    const user= await accountsApi.getInfUser(parseInt(localStorage.getItem('user_id'),10));
    setUser(user.data);
  }

  // Hàm toggle mở/đóng sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logOut=()=>{
    deleteTokens();
    navigate("/login");
  }

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
                <Link className="sidebar-link-emp" to="/employee/customer-care">
                  <i className="fa-solid fa-headset"></i>{" "}
                  <span>Chăm sóc khách hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/employee/order-manager">
                  <i className="fa fa-clipboard-list"></i>{" "}
                  <span>Quản lý đơn hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <Link className="sidebar-link-emp" to="/employee/payment">
                  <i className="fa fa-credit-card"></i>{" "}
                  <span>Thanh toán đơn hàng</span>
                </Link>
              </li>
              <li className="sidebar-item-emp">
                <a className="sidebar-link-emp" href="" onClick={logOut}>
                  <i className="fas fa-sign-out-alt"></i>{" "}
                  <span>Đăng xuất</span>
                </a>
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
                  <Link className="nav-icon-emp" to="/employee/customer-care" id="alertsDropdown">
                    <i className="fa-solid fa-bell"></i>
                    <span className="indicator-emp">4</span>
                  </Link>
                </li>
                <li className="nav-item-emp dropdown">
                  <a className="nav-icon-emp" href="#" id="messagesDropdown">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>
                <li className="nav-item-emp dropdown">
                  <a className="nav-link profile-toggle-emp" href="#">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${user.photoPath}`}
                      alt="Charles Hall"
                      className="avatar-emp"
                    />

                    <span>{name||"Loading.."}</span>
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
                    <a className="dropdown-item-emp" href="#" onClick={logOut}>
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
