import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import accountsApi from "../../api/accountsApi"; // API cho Accounts

export default function AccountManager() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await accountsApi.getAllAccount();
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleChangeActive = async (id) => {
    try {
      await accountsApi.changeActiveAccount(id);
      fetchAccounts();
      console.log("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleDeleteAccount = async (id) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa tài khoản có mã ${id} này không?`);
    
    if (confirmed) {
      try {
        await accountsApi.removeAccount(id);
        fetchAccounts();
        console.log("Account deleted successfully");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      console.log("Hủy xóa tài khoản");
    }
  };
  

  return (
    <>
      <HeaderAdmin>
        <div className="container-order-emp">
          <section className="order-overview-emp">
            <h1 className="container-h1-emp">QUẢN LÝ TÀI KHOẢN</h1>
            <p className="description-emp">
              Tại đây bạn có thể quản lý tất cả tài khoản người dùng.
            </p>
          </section>

          <div className="row">
            <div className="col-md-12 customer-with-emp">
              <h2>Danh sách tài khoản</h2>
              <div className="search-container-order-emp">
                <input
                  type="text"
                  id="searchInput1"
                  className="form-control-emp"
                  placeholder="Tìm kiếm..."
                />
              </div>
              <Link to="/admin/create-account">
                <button className="btn btn-warning btn-xs confirm-btn-emp">
                  <i className="fa fa-plus"></i> Tạo mới
                </button>
              </Link>
              <div className="table-responsive-emp">
                <table
                  id="mytable1"
                  className="table-emp table-bordered-emp table-striped-emp"
                >
                  <thead>
                    <tr>
                      <th>Mã tài khoản</th>
                      <th>Tên người dùng</th>
                      <th>Email</th>
                      <th>Tên đăng nhập</th>
                      <th>Trạng thái</th>
                      <th>Loại tài khoản</th>
                      <th>Sửa</th>
                      <th>Active</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody-emp">
                    {accounts.map((account, index) => (
                      <tr key={index}>
                        <td>{account.id}</td>
                        <td>{account.name}</td>
                        <td>{account.email}</td>
                        <td>{account.username}</td>
                        <td>{account.active ? "Đang hoạt động" : "Bị khóa"}</td>
                        <td>{account.users_role_id}</td>
                        <td>
                          <Link to={`/admin/update-account/${account.id}`}>
                            <button
                              className="btn btn-primary btn-xs edit-btn-emp"
                              data-id={account.id}
                            >
                              <i className="fa fa-pencil-alt"></i>
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className={`btn btn-xs ${
                              account.active ? "btn-success" : "btn-danger"
                            } delete-btn-emp`}
                            onClick={() => handleChangeActive(account.id)}
                          >
                            <i className="fa fa-sync-alt"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-xs delete-btn-emp"
                            onClick={() => handleDeleteAccount(account.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
