import axios from 'axios';
import { refreshAccessToken } from '../services/login.service';
const axiosApiInstance = axios.create();


// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
      const access_token = localStorage.getItem('token');
      if(!access_token){
        window.location.reload();
        return config;
      }
      try {
        const token = JSON.parse(access_token);
        config.headers = { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
      }catch {
        config.headers = { 
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json',
          }
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });


// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    console.log(access_token);          
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.token;
    localStorage.setItem("token", JSON.stringify(access_token.token));
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});


export default axiosApiInstance;