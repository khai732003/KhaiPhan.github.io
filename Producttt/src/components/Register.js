import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    name: '',
    password: '',
    phone: '',
    address: '',
    roleId: '4', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gửi ddata res lên API 
    try {
      const response = await axios.post('/register', formData);

      // Xử lý phản hồi từ máy chủ (thành công hoặc lỗi)
      console.log(response.data);

      // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      // Ví dụ: history.push('/login');
    } catch (error) {
      // Xử lý lỗi khi đăng ký không thành công
      console.error('Đăng ký không thành công:', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="RoleID"></label>
        <input type="hidden" name="roleId" value={formData.roleId} />
        <label htmlFor="ID"></label>
        <input type="hidden" name="id" value={formData.id} />

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Họ và tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
