import React, { useState } from 'react';
import './login.scss';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { Link } from 'react-router-dom';



function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // Define a function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Authentication succeeded, set loggedIn to true
        setLoggedIn(true);
      } else {
        // Authentication failed, set an error message
        setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập: ', error);
    }
  };

  return (
    <>
      <Header />
      <div className='login-container'>
        <span>Đăng Nhập</span>

        {loggedIn ? (
          <div>
            <p>Đăng nhập thành công!</p>
            {/* You can redirect to the home page or another page here */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='form-login'>
              <input
                placeholder='Tên Tài khoản'
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                placeholder='Mật Khẩu'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error">{error}</p>}
            <button type="submit">Đăng nhập</button>
            <div>

              <Link to="/forgot-password" className='fg-password'>Quên mật khẩu?</Link>
              <p>chưa có tài khoản | <Link to ="/signup" className='sign-up nav-link' >Đăng Ký</Link></p>
            

            </div>
            

          </form>
        )}
      </div >
      <Footer />
    </>
  );
}

export default Login;
