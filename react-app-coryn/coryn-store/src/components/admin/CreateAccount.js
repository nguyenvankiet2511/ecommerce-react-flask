import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import accountsApi from "../../api/accountsApi"; // API for Accounts

export default function CreateAccount() {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    active: true,
    users_role_id: "", // Adjust according to your role structure
  });

  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: account.name,
      username: account.username,
      password: account.password,
      email: account.email,
      user_role_id: account.users_role_id,
    };
    console.log(data);

    const response = await accountsApi.createAccount(data);
    if (response.status === 201) {
      alert("Tài khoản đã được tạo thành công.");
      navigate('/admin/account-manager')
    } else {
      alert(response.data.msg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <HeaderAdmin>
        <div className="container-admin mt-5-admin">
          <h2 className="title-admin">Tạo tài khoản mới</h2>
          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-group-admin">
              <label htmlFor="name" className="label-admin">
                Tên người dùng
              </label>
              <input
                type="text"
                className="input-admin"
                id="name"
                name="name"
                value={account.name}
                onChange={handleChange}
                placeholder="Nhập tên người dùng"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="email" className="label-admin">
                Email
              </label>
              <input
                type="email"
                className="input-admin"
                id="email"
                name="email"
                value={account.email}
                onChange={handleChange}
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="username" className="label-admin">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="input-admin"
                id="username"
                name="username"
                value={account.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="password" className="label-admin">
                Mật khẩu
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Hiển thị mật khẩu
                  className="input-admin"
                  id="password"
                  name="password"
                  value={account.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="btn-show-password"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Xem mật khẩu"}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="form-group-admin">
              <label htmlFor="users_role_id" className="label-admin">
                Loại tài khoản
              </label>
              <select
                className="input-admin"
                id="users_role_id"
                name="users_role_id"
                value={account.users_role_id}
                onChange={handleChange}
                required
              >
                <option value="">Chọn loại tài khoản</option>
                <option value="1">Quản trị viên</option>
                <option value="2">Nhân viên</option>
                <option value="3">Khách hàng</option>
              </select>
            </div>

            <button type="submit" className="btn-admin btn-primary-admin">
              Tạo
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/account-manager")}
              className="btn-admin btn-secondary-admin"
            >
              Hủy
            </button>
          </form>
        </div>
        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
