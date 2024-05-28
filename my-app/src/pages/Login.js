import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './BiitLogo.jpeg';
import Input from '../components/UserInput';
import Password from '../components/Password';
import { Button, Alert } from 'antd';
import '../Styling/Login.css';
import EndPoint from '../endpoints';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResponse = (data) => {
    const { role, profileId } = data;

    // Store data in localStorage
    localStorage.setItem('profileId', profileId.toString());
    localStorage.setItem('savedUsername', username);

    // Navigate based on user role
    switch (role) {
      case 1:
        navigate('/Admin-Dashboard');
        break;
      case 2:
        navigate('/Committee-Dashboard');
        break;
      case 3:
        navigate('/Faculty-Dashboard');
        break;
      case 4:
        navigate('/StudentDashboard');
        break;
      default:
        setError('Invalid role.');
    }
  };

  const Submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${EndPoint.login}?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Response error text:', text);
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Response data:', data);
      handleResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid User. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <header className="header">
          <div className="Biit_logo">
            <img src={logo} alt="BIIT Financial Aid Allocation Tool" />
          </div>
          <h1 className="h1">
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
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                Login
              </Button>
            </div>
            {error && <Alert message={error} type="error" showIcon />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
