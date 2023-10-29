import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    // Hàm này sẽ được gọi mỗi khi giá trị trong localStorage thay đổi
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token"); // Lấy giá trị mới của token từ localStorage
      setToken(newToken); // Cập nhật state token
      setUserFromToken(newToken); // Cập nhật user từ token mới
    };

    // Thêm event listener để theo dõi sự thay đổi của localStorage
    window.addEventListener("storage", handleStorageChange);

    // Gọi hàm setUserFromToken để cập nhật user từ token ban đầu
    setUserFromToken(token);

    // Cleanup: loại bỏ event listener khi component bị unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]); // Effect này chạy mỗi khi giá trị của token thay đổi

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("orderId");
    setToken(null); // Đặt token thành null khi đăng xuất
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
