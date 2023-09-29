import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Create a login request using fetch
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    // If login is successful, redirect to the introduction page
                    navigate('/introduction');
                } else {
                    // Handle login failure, such as displaying an error message
                    console.error('Login failed');
                }
            })
            .catch((error) => {
                // Handle network connection errors
                console.error('Network error:', error);
            });
    };

    return (
        <div>
            <h1>Đăng Nhập</h1>
            <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Đăng Nhập</button>
        </div>
    );
}

export default Login;
