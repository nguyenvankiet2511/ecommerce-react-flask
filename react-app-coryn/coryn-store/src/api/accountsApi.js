import axiosClient from "./axiosClients";

const accountsApi = {
  // Đăng nhập
  getToken: () => {
    const url = "/csrf-token";
    return axiosClient.get(url);
  },
  login: (formData) => {
    const url = "/login";
    return axiosClient.post(url, formData, { withCredentials: true });
  },

  // Đăng ký
  register: (userData) => {
    const url = "/register";
    return axiosClient.post(url, userData);
  },

  // Lấy thông tin người dùng
  getInfUser(id) {
    const url = `/get-user/${id}`;
    return axiosClient.get(url);
  },

  updateInfUser(user_id, data){
    const url =`/update-user/${user_id}`;
    return axiosClient.patch(url,data)
  },

  getCurentUser: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be logged in");
      return null; // Trả về null nếu không có token
    }
    const url = "/protected";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: () => {
    const url = "/logout";
    return axiosClient.get(url);
  },
};

export default accountsApi;
