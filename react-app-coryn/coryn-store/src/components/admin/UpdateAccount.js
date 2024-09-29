import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import accountsApi from "../../api/accountsApi"; // API for Accounts

export default function UpdateAccount() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [account, setAccount] = useState({
    name: "",
    email: "",
    username: "",
    password: "", // Thêm trường mật khẩu vào trạng thái
    oldPassword: "", // Trường mật khẩu cũ
    active: true,
    users_role_id: "", // Adjust according to your role structure
  });
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showOldPassword, setShowOldPassword] = useState(false); // Trạng thái hiển thị mật khẩu cũ

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await accountsApi.getAccountById(parseInt(params.accountId, 10));
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    fetchAccount();
  }, [params.accountId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra mật khẩu cũ trước khi cập nhật
      const isOldPasswordValid = await accountsApi.validateOldPassword(account.username, account.oldPassword);
      if (!isOldPasswordValid) {
        alert("Mật khẩu cũ không đúng!");
        return;
      }

      // Cập nhật tài khoản
      await accountsApi.updateAccount(account); // Truyền dữ liệu tài khoản vào API
      alert("Cập nhật tài khoản thành công!");
      navigate("/admin/account-manager");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo ngược trạng thái hiển thị mật khẩu
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword); // Đảo ngược trạng thái hiển thị mật khẩu cũ
  };

  return (
    <>
      <HeaderAdmin>
        <div className="container-admin mt-5-admin">
          <h2 className="title-admin">Cập nhật tài khoản</h2>
          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-group-admin">
              <label htmlFor="name" className="label-admin">Tên người dùng</label>
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
              <label htmlFor="email" className="label-admin">Email</label>
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
              <label htmlFor="username" className="label-admin">Tên đăng nhập</label>
              <input
                type="text"
                className="input-admin"
                id="username"
                name="username"
                value={account.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
               readOnly
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="oldPassword" className="label-admin">Mật khẩu cũ</label>
              <div className="input-group">
                <input
                  type={showOldPassword ? "text" : "password"} // Hiển thị mật khẩu cũ
                  className="input-admin"
                  id="oldPassword"
                  name="oldPassword"
                  value={account.oldPassword}
                  onChange={handleChange}
                  placeholder="Mật khẩu cũ"
                  required
                />
                <button 
                  type="button" 
                  onClick={toggleOldPasswordVisibility} 
                  className="btn-show-password"
                  aria-label={showOldPassword ? "Ẩn mật khẩu" : "Xem mật khẩu"}
                >
                  <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group-admin">
              <label htmlFor="password" className="label-admin">Mật khẩu mới</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Hiển thị mật khẩu
                  className="input-admin"
                  id="password"
                  name="password"
                  value={account.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu mới"
                  required
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="btn-show-password"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Xem mật khẩu"}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group-admin">
              <label htmlFor="active" className="label-admin">
                Trạng thái
                <input
                  type="checkbox"
                  className="ml-2"
                  id="active"
                  name="active"
                  checked={account.active}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-admin">
              <label htmlFor="users_role_id" className="label-admin">Loại tài khoản</label>
              <input
                type="text"
                className="input-admin"
                id="users_role_id"
                name="users_role_id"
                value={account.users_role_id}
                onChange={handleChange}
                placeholder="Nhập loại tài khoản"
                required
              />
            </div>

            <button type="submit" className="btn-admin btn-primary-admin">Cập nhật</button>
            <button type="button" onClick={() => navigate("/admin/account-manager")} className="btn-admin btn-secondary-admin">Hủy</button>
          </form>
        </div>
        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
