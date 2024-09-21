import React from "react";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";

export default function ProfileEmployee() {
  return (
    <>
      <HeaderEmployee>
        <section className="ftco-section contact-section bg-light">
          <div className="container">
            <div className="profile-row-pfe">
              <div className="profile-container-pfe">
                <div className="personal-info-pfe">
                  <h2>Personal Information</h2>

                  <form id="profile-form-pfe">
                    <label htmlFor="name">
                      <strong>Name:</strong>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue="John Doe"
                    />

                    <label htmlFor="email">
                      <strong>Email:</strong>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue="johndoe@example.com"
                    />

                    <label htmlFor="phone">
                      <strong>Phone Number:</strong>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue="123-456-7890"
                    />

                    <label htmlFor="address">
                      <strong>Address:</strong>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      defaultValue="123 Main St, Anytown, USA"
                    />

                    <label htmlFor="customer-id">
                      <strong>Customer ID:</strong>
                    </label>
                    <input
                      type="text"
                      id="customer-id"
                      name="customer-id"
                      defaultValue="CUST-001"
                      readOnly
                    />

                    <label htmlFor="customer-code">
                      <strong>Customer Code:</strong>
                    </label>
                    <input
                      type="text"
                      id="customer-code"
                      name="customer-code"
                      defaultValue="ABC123XYZ"
                      readOnly
                    />

                    <button type="submit" className="btn-save-pfe">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>

              <div className="container-profile-pfe">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile-pfe">
                      <div className="avatar-pfe">
                        <img
                          src=""
                          alt="Circle Image"
                          className="img-raised rounded-circle img-fluid"
                        />
                      </div>
                      <div className="name-pfe">
                        <h3 className="title">Christian Jesse</h3>
                        <h6>Customer</h6>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon-pfe btn-link btn-facebook-pfe"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon-pfe btn-link btn-google-pfe"
                        >
                          <i className="fab fa-google"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon-pfe btn-link btn-twitter-pfe"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="description-pfe text-center">
                  <p>
                    "Customers are the backbone of any business. They seek
                    quality, value, and a great shopping experience. A happy
                    customer not only returns but also promotes the brand to
                    others."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterEmployee />
      </HeaderEmployee>
    </>
  );
}
