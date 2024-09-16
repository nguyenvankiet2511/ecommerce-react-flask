import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import accountsApi from "../../api/accountsApi";
import cartApi from "../../api/cartApi";
import { isLoggedIn, deleteTokens } from "../../api/authToken";
import axios from "axios";
import { useCart } from "../../components/context/CartContext";

export default function Header() {
  const { cartCount, updateCartCount } = useCart(0)|| {};
  const checkLoggedIn = isLoggedIn();
  const userId = localStorage.getItem("user_id");
  const [menuActive, setMenuActive] = useState(false);
  const [curentUser, setCurrentUser] = useState([null]);
  const [dropdownOpen, setDropdownOpen] = useState({
    currency: false,
    language: false,
    account: false,
  });

  const headerRef = useRef(null);
  const topNavRef = useRef(null);
  const menuRef = useRef(null);
  const fsOverlayRef = useRef(null);
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setHeader();
    const handleScroll = () => setHeader();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuActive]);
  //Lấy current user
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await accountsApi.getCurentUser();
      setCurrentUser(user.data.logged_in_as);
      console.log("User Data:", user.data.logged_in_as);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  //Lấy sổ lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchCountCart = async () => {
      try {
        const count = await cartApi.getCountCartByUserId(userId);
        updateCartCount(count.data.cart_count); // Cập nhật số lượng giỏ hàng
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCountCart();
  }, [userId, updateCartCount]);

  const handleLogout = async () => {
    try {
      deleteTokens();
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const setHeader = () => {
    const header = headerRef.current;
    if (window.innerWidth < 992) {
      header.style.top = window.scrollY > 100 ? "0" : "0";
    } else {
      header.style.top = window.scrollY > 100 ? "-50px" : "0";
    }

    if (window.innerWidth > 991 && menuActive) {
      closeMenu();
    }
  };

  const openMenu = () => {
    menuRef.current.classList.add("active");
    fsOverlayRef.current.style.pointerEvents = "auto";
    setMenuActive(true);
  };

  const closeMenu = () => {
    menuRef.current.classList.remove("active");
    fsOverlayRef.current.style.pointerEvents = "none";
    setMenuActive(false);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  return (
    <div>
      <header className="header trans_300" ref={headerRef}>
        <div className="top_nav" ref={topNavRef}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="top_nav_left">
                  Miễn phí vận chuyển cho tất cả các đơn hàng trên 1,000,000 VNĐ
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="top_nav_right">
                  <ul className="top_nav_menu">
                    <li
                      className="currency"
                      onMouseEnter={() => toggleDropdown("currency")}
                      onMouseLeave={() => toggleDropdown("currency")}
                    >
                      <a href="#">
                        usd
                        <i className="fa fa-angle-down"></i>
                      </a>
                      {dropdownOpen.currency && (
                        <ul className="currency_selection">
                          <li>
                            <a href="#">cad</a>
                          </li>
                          <li>
                            <a href="#">aud</a>
                          </li>
                          <li>
                            <a href="#">eur</a>
                          </li>
                          <li>
                            <a href="#">gbp</a>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li
                      className="language"
                      onMouseEnter={() => toggleDropdown("language")}
                      onMouseLeave={() => toggleDropdown("language")}
                    >
                      <a href="#">
                        English
                        <i className="fa fa-angle-down"></i>
                      </a>
                      {dropdownOpen.language && (
                        <ul className="language_selection">
                          <li>
                            <a href="#">French</a>
                          </li>
                          <li>
                            <a href="#">Italian</a>
                          </li>
                          <li>
                            <a href="#">German</a>
                          </li>
                          <li>
                            <a href="#">Spanish</a>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li
                      className="account"
                      onMouseEnter={() => toggleDropdown("account")}
                      onMouseLeave={() => toggleDropdown("account")}
                    >
                      <a href="#">
                        Tài khoản của tôi
                        <i className="fa fa-angle-down"></i>
                      </a>
                      {dropdownOpen.account && (
                        <ul className="account_selection">
                          {checkLoggedIn ? (
                            <>
                              <li>
                                <Link to="login">
                                  <i
                                    className="fa fa-user"
                                    aria-hidden="true"
                                  ></i>
                                  Hồ sơ
                                </Link>
                              </li>
                              <li>
                                <a href="#" onClick={handleLogout}>
                                  <i
                                    className="fa fa-sign-out"
                                    aria-hidden="true"
                                  ></i>
                                  Đăng xuất
                                </a>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <Link to="login">
                                  <i
                                    className="fa fa-sign-in"
                                    aria-hidden="true"
                                  ></i>
                                  Đăng nhập
                                </Link>
                              </li>
                              <li>
                                <Link to="/register">
                                  <i
                                    className="fa fa-user-plus"
                                    aria-hidden="true"
                                  ></i>
                                  Đăng ký
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <Link to="/">
                    coryn<span>store</span>
                  </Link>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <Link to="/">home</Link>
                    </li>
                    <li>
                      <Link to={`/category/${-1}`}>shop</Link>
                    </li>
                    <li>
                      <Link to="/about">about</Link>
                    </li>
                    <li>
                      <Link to="/pages">pages</Link>
                    </li>
                    <li>
                      <Link to="/blog">blog</Link>
                    </li>
                    <li>
                      <Link to="/contact">contact</Link>
                    </li>
                  </ul>
                  <ul className="navbar_user">
                    <li className="user-menu">
                      {checkLoggedIn ? (
                        <>
                          <Link to="/profile">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span className="user-text">{curentUser.name}</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/login">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span className="user-text">Đăng nhập</span>
                          </Link>
                        </>
                      )}
                    </li>
                    <li className="checkout">
                      <Link to={`/cart`}>
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                        <span id="checkout_items" className="checkout_items">
                          {cartCount}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="hamburger_container" onClick={openMenu}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="fs_menu_overlay"
        ref={fsOverlayRef}
        onClick={closeMenu}
      ></div>
      <div className="hamburger_menu" ref={menuRef}>
        <div className="hamburger_close" onClick={closeMenu}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="hamburger_menu_content text-right">
          <ul className="menu_top_nav">
            <li className="menu_item has-children">
              <a href="#">
                usd
                <i className="fa fa-angle-down"></i>
              </a>
              <ul className="menu_selection">
                <li>
                  <a href="#">cad</a>
                </li>
                <li>
                  <a href="#">aud</a>
                </li>
                <li>
                  <a href="#">eur</a>
                </li>
                <li>
                  <a href="#">gbp</a>
                </li>
              </ul>
            </li>
            <li className="menu_item has-children">
              <a href="#">
                English
                <i className="fa fa-angle-down"></i>
              </a>
              <ul className="menu_selection">
                <li>
                  <a href="#">French</a>
                </li>
                <li>
                  <a href="#">Italian</a>
                </li>
                <li>
                  <a href="#">German</a>
                </li>
                <li>
                  <a href="#">Spanish</a>
                </li>
              </ul>
            </li>
            <li className="menu_item">
              <Link to="/login">
                <i className="fa fa-user" aria-hidden="true"></i>
                Đăng nhập
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/register">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                Đăng ký
              </Link>
            </li>
            <li className="menu_item">
              <Link to={`/cart/${userId}`}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                Giỏ hàng
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/contact">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
