import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from './CustomAxios/customAxios'; // Import phiên bản đã được cấu hình
import { useAuth } from './Context/AuthContext';

const Login = () => {
  const{user, loadUser, setUserFromToken} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post('/user/authenticate', formData);

      const token = response.data;

      localStorage.setItem('token', token);

      setUserFromToken(token)
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };

  const handleReturnPage =() =>{
    navigate('/');
  }

  return (
    
    <div>
      <div><button onClick={handleReturnPage}>Return Home Page</button></div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên Đăng Nhập:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Mật Khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
      
    </div>
  );
};

export default Login;

