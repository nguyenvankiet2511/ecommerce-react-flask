import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <footer className="ftco-footer ftco-section">
        <div className="container">
          <div className="row">
            <div className="mouse">
              <a href="#" className="mouse-icon">
                <div className="mouse-wheel">
                  <span className="ion-ios-arrow-up"></span>
                </div>
              </a>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Coryn Store</h2>
                <p>
                  Khám phá phong cách của bạn với những thiết kế tinh tế, được
                  tạo ra để làm nổi bật cá tính và phong cách riêng của bạn
                </p>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                  <li className="">
                    <a href="#">
                      <span className="icon-twitter"></span>
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 ml-md-5">
                <h2 className="ftco-heading-2">Menu</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="py-2 d-block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className="py-2 d-block">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="py-2 d-block">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="py-2 d-block">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Help</h2>
                <div className="d-flex">
                  <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                    <li>
                      <a href="#" className="py-2 d-block">
                        Thông tin vận chuyển
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Đổi trả &amp; Ưa đãi
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Tiện lợi &amp; Nhanh chóng
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Chính sách bảo vệ
                      </a>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-2 d-block">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-2 d-block">
                        Hỗ trợ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Bạn có thắc mắc?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker"></span>
                      <span className="text">
                        74 TL 04, Thạch Lộc, Quận 12, Thành phố Hồ Chí
                        Minh
                      </span>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-phone"></span>
                        <span className="text">+84 972614451</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon icon-envelope"></span>
                        <span className="text">
                          nguyenvankiet25112003@gmail.com
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                Đồ án ngành - Trường đại học Mở Thành phố Hồ Chí Minh - Sinh
                viên thực hiện{" "}
                <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                  Nguyễn Văn Kiệt
                </a>{" "}
                - Giảng viên hướng dẫn{" "}
                <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                  ThS.Dương Hữu Thành
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
