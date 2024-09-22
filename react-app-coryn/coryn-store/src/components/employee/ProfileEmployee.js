import React, { useEffect, useState } from "react";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";
import accountsApi from "../../api/accountsApi";

export default function ProfileEmployee() {
  const user_id = localStorage.getItem("user_id");
  const [infUser, setInfUser] = useState({});
  
  useEffect(() => {
    fetchInfUser();
  }, []);

  const fetchInfUser = async () => {
    const response = await accountsApi.getInfUser(user_id);
    setInfUser(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfUser((prevInfUser) => ({ ...prevInfUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountsApi.updateInfUser(user_id, infUser); 
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }

  return (
    <>
      <HeaderEmployee>
        <section className="ftco-section contact-section bg-light">
          <div className="container">
            <div className="profile-row-pfe">
              <div className="profile-container-pfe">
                <div className="personal-info-pfe">
                  <h2>Thông tin cá nhân</h2>

                  <form id="profile-form-pfe" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                      <strong>Họ và tên:</strong>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={infUser.name || ""}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="email">
                      <strong>Email:</strong>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={infUser.email || ""}
                      readOnly
                    />
                    <label htmlFor="birthDate">
                      <strong>Ngày sinh:</strong>
                    </label>
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      value={formatDate(infUser.birthDate) || ""}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="customer-gender">
                      <strong>Giới tính:</strong>
                    </label>
                    <input
                      type="text"
                      id="customer-gender"
                      name="gender"
                      value={infUser.gender === 1 ? "Nam" : "Nữ"}
                      readOnly
                    />

                    <label htmlFor="phone">
                      <strong>Số điện thoại:</strong>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={infUser.phone || ""}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="address">
                      <strong>Địa chỉ:</strong>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={infUser.address || ""}
                      onChange={handleInputChange}
                    />

                    <button type="submit" className="btn-save-pfe">
                      Cập nhật thông tin
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
                          src={`${process.env.PUBLIC_URL}/images/${infUser.photoPath}`}
                          alt="Circle Image"
                          className="img-raised rounded-circle img-fluid"
                        />
                      </div>
                      <div className="name-pfe">
                        <h3 className="title">{infUser.name}</h3>
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
                    "Dịch vụ khách hàng là xương sống của bất kỳ doanh nghiệp
                    nào. Họ tìm kiếm chất lượng, giá trị và một trải nghiệm mua
                    sắm tuyệt vời. Một khách hàng hài lòng không chỉ quay lại mà
                    còn giới thiệu thương hiệu cho người khác."
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
