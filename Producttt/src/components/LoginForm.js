import React, { Component } from 'react';
import './LoginForm.css'; // Import your CSS file

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    const { username, password, rememberMe } = this.state;
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    // You can make an API call for authentication here
  };

  render() {
    const { username, password, rememberMe } = this.state;

    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={this.handleChange}
              />
              Remember Me
            </label>
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="reset-password">
          <a href="#">Forgot Password?</a>
        </p>
      </div>
    );
  }
}

export default LoginForm;
