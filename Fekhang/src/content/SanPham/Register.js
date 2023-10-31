import React, { useState } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { Alert, Button ,} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Scss/Login-Register.scss'
const Register = () => {
  const { user, loadUser, setUserFromToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fullname: '',
    gender: '', 
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

      console.log(response)
      const { accessToken } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', accessToken);
      setUserFromToken(accessToken)
      navigate('/');
      console.log('Dữ liệu từ server:', response.data.accessToken);

    }  catch (error) {
      // Kiểm tra xem error.response và error.response.data.message có tồn tại hay không
    if (error.response && error.response.data && error.response.data.message) {
      // Kiểm tra nếu chuỗi chứa từ 'email' hoặc 'username'
      if (error.response.data.message.includes('email') || error.response.data.message.includes('username')) {
        setError('Email hoặc tên người dùng đã tồn tại.');
      } else {
        setError('Đã xảy ra lỗi khi đăng kí.');
      }
    } else {
      // Nếu không có thông báo từ server, hiển thị thông báo lỗi chung
      setError('Đã xảy ra lỗi khi đăng kí.');
    }
    }
  };

  const handleReturnPage = () => {
    window.history.back();
  }

  return (
    <div>
      <div className="alert-container"> {/* Thêm class "alert-container" để áp dụng CSS */}
        {error && <Alert severity="info">{error}</Alert>}
      </div>
      <section className="vh-110" style={{ backgroundColor: "#808080" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  
                  <div className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-1.5 text-black">
                      <form onSubmit={handleRegister}>
                        <div className="d-flex justify-content-between align-items-center  mb-1 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i> */}
                          <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            <Button sx={{ fontSize: 18 }} variant="contained" 
                            style={{ backgroundColor: '#e0e0e0', color: '#212121' }} 
                            startIcon={<ArrowBackIosIcon/>} onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                          <span className="h1 fw-bold mb-0">
                              REGISTER
                          </span>
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Email'
                          />

                        </div>

                        <label className="form-label" htmlFor="form2Example17">
                          User Name
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Username'
                          />

                        </div>

                        <label className="form-label" htmlFor="form2Example17">
                          Full Name
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your FullName'
                          />

                        </div>

                        <label className="form-label" htmlFor="form2Example17">
                          Password
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Password'
                          />

                        </div>
                        
                          <label className="form-label" htmlFor="form2Example17">
                            Giới Tính:
                          </label>

                        <div className="form-outline mb-4">
                          <select
                            className="form-control form-control-lg"
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

                        
                        <label className="form-label" htmlFor="form2Example17">
                          Phone Number
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"

                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Phone Number'
                          />

                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Address
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Address'
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Register Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1552826580-0d47cf898dee?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlyZCUyMGNhZ2V8ZW58MHx8MHx8fDA%3D"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "0 1rem 1rem 0", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </div >
  );
};

export default Register;
