import axiosClient from "./axiosClients";

const accountsApi = {
  // Đăng nhập
  getToken: () =>{
    const url = '/csrf-token';
    return axiosClient.get(url);

  },
  login: (formData) => {
    const url = '/login';
    return axiosClient.post(url, formData, { withCredentials: true });
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
  getCurentUser : () =>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, user might not be logged in');
      return null; // Trả về null nếu không có token
    }
    const url ='/protected';
    return axiosClient.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  

  // Đăng xuất
  logout: () => {
    const url = '/logout';
    return axiosClient.get(url);
  },

  // Cập nhật thông tin người dùng
  updateUser: (userId, userData) => {
    const url = `/user/${userId}`;
    return axiosClient.put(url, userData);
  }
};

export default accountsApi;
