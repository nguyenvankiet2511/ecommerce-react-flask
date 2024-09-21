import React from 'react';

export default function FooterEmployee() {
  return (
    <>
      <footer className="footer-emp">
        <div className="container-2-emp">
          <div className="row-emp">
            {/* Contact Info */}
            <div className="col-lg-4-emp col-md-6-emp">
              <h5>Contact Us</h5>
              <p>
                <i className="fas fa-map-marker-alt"></i> 123 Fashion Street, New York, USA
              </p>
              <p>
                <i className="fas fa-phone"></i> +1 234 567 890
              </p>
              <p>
                <i className="fas fa-envelope"></i> support@mensfashion.com
              </p>
            </div>

            {/* Information */}
            <div className="col-lg-4-emp col-md-6-emp">
              <h5>Information</h5>
              <ul className="footer-links-emp">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="col-lg-4-emp col-md-12-emp">
              <h5>Follow Us</h5>
              <div className="social-links-emp">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom-emp">
            <div className="row-emp">
              <div className="col-lg-12-emp text-center">
                <div className="footer__copyright__text-emp">
                  <p>Welcome to our shopping page {new Date().getFullYear()} <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="index.html" target="_blank" rel="noopener noreferrer">Cosmic Store</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
