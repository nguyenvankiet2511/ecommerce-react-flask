import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:5001', // Địa chỉ API của bạn
  withCredentials: true, // Cho phép gửi cookie phiên cùng với yêu cầu
  headers: {
    'Content-Type': 'application/json', // Định dạng nội dung là JSON
  },
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default axiosClient