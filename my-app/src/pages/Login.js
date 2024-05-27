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
  const [loading, setLoading] = useState(false); // State for loading spinner
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
    setLoading(true); // Start loading spinner

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

      const role = data.role;
      if (role === 4) {
        navigate('/StudentDashboard');
        const profileId = data.profileId;
        localStorage.setItem('profileId', profileId.toString());
        localStorage.setItem('savedUsername', username);
      } else if (role === 1) {
        navigate('/Admin-Dashboard');
        const profileId = data.profileId;
        localStorage.setItem('profileId', profileId.toString());
        localStorage.setItem('savedUsername', username);
      } else {
        setError('Invalid role.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid User. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
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
