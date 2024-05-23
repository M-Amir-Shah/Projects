import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './BiitLogo.jpeg';
import Input from '../components/UserInput';
import Password from '../components/Password';
import { Button } from 'antd';
import '../Styling/Login.css';
import EndPoint from '../endpoints'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const Submit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${EndPoint.login}?username=${username}&password=${password}`, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      navigate('/StudentDashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <header>
          <div className="Biit_logo">
            <img src={logo} alt="BIIT Financial Aid Allocation Tool" />
          </div>
          <h1 id="title" className="h1">
            BIIT Financial Aid Allocation Tool
          </h1>
        </header>
        <form onSubmit={Submit}>
          <div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={UsernameChange}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <Password
                id="password"
                value={password}
                onChange={PasswordChange}
                placeholder="Password"
              />
            </div>
            <br />
            <div className="button-container">
              <Button type="primary" htmlType="submit" size='large'>
                Login
              </Button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
