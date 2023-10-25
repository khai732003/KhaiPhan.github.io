import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
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
    const token = localStorage.getItem('token');
    setUserFromToken(token); 

    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        setUserFromToken(newToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); 
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
