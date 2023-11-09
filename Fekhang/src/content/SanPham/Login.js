import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from './Context/AuthContext';
import './Scss/Login-Register.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import './Scss/Product.scss'

const Login = ({ currentPath }) => {
  const orderId = localStorage.getItem("orderId");
  console.log(currentPath)
  const { user, loadUser, setUserFromToken } = useAuth();
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
      setUserFromToken(token);

      // Đặt giá trị của cờ để xác định việc quay trở lại từ Login.js
      localStorage.setItem('isReturningFromLogin', 'true');

      const toBuyPath = localStorage.getItem('toBuy');

      // Nếu có đường dẫn đã lưu, chuyển hướng đến đường dẫn đó và xóa toBuy từ localStorage
      if (toBuyPath) {
        // localStorage.removeItem('toBuy');
        navigate(toBuyPath);
      } else if (currentPath) {
        // Nếu không có đường dẫn đã lưu, và có currentPath, chuyển hướng đến currentPath
        navigate(currentPath);
      } else if (currentPath == undefined) {
        // Nếu không có đường dẫn đã lưu, và có currentPath, chuyển hướng đến currentPath
        navigate(-1);
      } else {
        // Nếu không có đường dẫn đã lưu và không có currentPath, chuyển hướng về trang trước
        navigate(-1);
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };


  const handleReturnPage = () => {
    navigate(-1);
  }
  const handleOnRegister = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    navigate('/register'); // Chuyển hướng đến trang đăng ký
  };

  return (

    <div>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">

                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1552826580-0d47cf898dee?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlyZCUyMGNhZ2V8ZW58MHx8MHx8fDA%3D"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />

                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleLogin}>
                        <div className="d-flex justify-content-between mb-3 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i> */}
                          <span className="h1 fw-bold mb-0">
                            {/* <img src='https://static.vecteezy.com/system/resources/previews/008/462/030/non_2x/minimalist-simple-bird-home-logo-design-free-vector.jpg'
                              alt='Logo'
                              style={{ width: '100px', height: 'auto' }} /> */}
                            LOGIN

                          </span>
                          <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            <Button sx={{ fontSize: 18 }} variant="contained"
                              style={{ backgroundColor: '#e0e0e0', color: '#212121' }}
                              startIcon={<ArrowBackIcon />} onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Sign into your account
                        </h5>
                        <label className="form-label" htmlFor="form2Example17">
                          UserName
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
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Password'
                          />

                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Login
                          </button>
                        </div>
                        {/* <a className="small text-muted" href="#!">
                          Forgot password?
                        </a> */}
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }} onClick={handleOnRegister}>
                          Don't have an account? <a href="#!" style={{ color: "#393f81" }}>Register here</a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default Login;

