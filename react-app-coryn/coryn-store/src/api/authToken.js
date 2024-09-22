import axiosClient from "./axiosClients";
import axios from 'axios';
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    return !!token; 
  };
  export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, user might not be logged in');
      return null; // Trả về null nếu không có token
    }
  
    try {
      const response = await axios.get('http://localhost:5001/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Protected data:', response.data.logged_in_as);
      return response; 
    } catch (error) {
      console.error('Error fetching protected data:', error);
      deleteTokens();
      return null;
    }
  };
  export function deleteTokens(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
}
  