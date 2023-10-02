// Login.js
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //  API
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      <input type="text" placeholder="Tên đăng nhập" value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input type="password" placeholder="Mật khẩu" value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

export default Login;
