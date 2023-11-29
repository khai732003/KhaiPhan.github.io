import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserFromToken = (token) => {
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        setUser(decodedToken);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const clearRememberedLogin = () => {
    localStorage.removeItem("rememberedUsername");
    localStorage.removeItem("rememberPassword");
  };

  useEffect(() => {
    const handleResponseError = (error) => {
      if (error.response && error.response.status === 403) {
        // Xử lý lỗi 403 ở đây
        // Chuyển hướng người dùng đến trang đăng nhập
        navigate("/login");
      }
    };

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      setUserFromToken(newToken);
    };

    window.addEventListener("storage", handleStorageChange);

    setUserFromToken(token);

    // Xử lý lỗi khi có response error
    axios.interceptors.response.use(null, handleResponseError);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      axios.interceptors.response.eject(handleResponseError);
    };
  }, [token]);

const logout = () => {
  setUser(null);
  localStorage.clear();
  setToken(null);
  clearRememberedLogin(); // Add this line to clear remembered login information
  navigate("/");
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, logout, setUserFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};
