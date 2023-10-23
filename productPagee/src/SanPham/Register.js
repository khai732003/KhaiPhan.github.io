import React, { useState } from 'react';
import customAxios from './CustomAxios/customAxios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fullname: '',
    gender: '', // Giá trị mặc định cho giới tính
    password: '',
    phone: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlJGeDFoDO2mUm5q3S8O_oc-8O4BYFWjNemRIdQ_6LQ&s',
    address: '',
    roleId: 1,
    managerId: null
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post(
        'http://localhost:8080/cageshop/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Phản hồi từ máy chủ:', response); // In toàn bộ đối tượng phản hồi

      const { accessToken } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', accessToken);
      navigate('/'); 
      console.log('Dữ liệu từ server:', response.data.accessToken);

    } catch (error) {
      console.error('Đăng kí thất bại:', error);

    }
  };

  const handleReturnPage =() =>{
    navigate('/');
  }

  return (
    <div>
      <div><button onClick={handleReturnPage}>Return Home Page</button></div>
      <h2>Đăng Kí</h2>
      <form onSubmit={handleRegister}>
        {/* Các trường nhập liệu giữ nguyên */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
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

        {/* Các trường cần chỉnh sửa */}
        <div>
          <label>Họ và Tên:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Giới Tính:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Chọn Giới Tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
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
        <div>
          <label>Điện Thoại:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>



        <button type="submit">Đăng Kí</button>
      </form>
    </div>
  );
};

export default Register;
