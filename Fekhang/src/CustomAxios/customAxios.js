import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:8080/cageshop/api", 
});

// Add a request interceptor
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
