import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './content/SanPham/Context/AuthContext';
import Login from './content/SanPham/Login';


const PrivateRoute = ({ allowedRoles, component: Component, path }) => {
  const { user } = useAuth();
  const thisPath = path;
  // Kiểm tra xem người dùng đã đăng nhập chưa

  const isAuthenticated = user !== null;

  // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    localStorage.setItem("toBuy", thisPath)
    return <Navigate to={`/login`} />;
  }

  // Kiểm tra xem người dùng có quyền không (nếu allowedRoles được truyền vào)
  const hasRequiredRole = allowedRoles ? allowedRoles.includes(user.role) : true;

  // Nếu người dùng có quyền, render component
  if (hasRequiredRole) {
    return <Component />;
  }

  // Nếu không có quyền, chuyển hướng đến trang không có quyền hoặc trang chính
  return <Navigate to="/" />;
};

export default PrivateRoute;
