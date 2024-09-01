import axiosClient from "./axiosClients";

const accountsApi = {
  // Đăng nhập
  login: (username, password) => {
    const url = '/login';
    return axiosClient.post(url, { username, password });
  },

  // Đăng ký
  register: (userData) => {
    const url = '/register';
    return axiosClient.post(url, userData);
  },

  // Lấy thông tin người dùng
  getUserInfo: () => {
    const url = '/user';
    return axiosClient.get(url);
  },

  // Đăng xuất
  logout: () => {
    const url = '/logout';
    return axiosClient.post(url);
  },

  // Cập nhật thông tin người dùng
  updateUser: (userId, userData) => {
    const url = `/user/${userId}`;
    return axiosClient.put(url, userData);
  }
};

export default accountsApi;
