import React, { useState } from 'react';
import '../Styling/Update-Password.css';
import Input from '../components/Input';
import Password from '../components/Password';
import { message, Button, Spin, Alert } from 'antd';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints';

const UpdatePassword = () => {
    const [arid, setArid] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleAridChange = (event) => {
        setArid(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(EndPoint.updatePassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: arid, username, password }),
            });

            if (response.ok) {
                message.success('Password updated successfully');
                setArid('');
                setPassword('');
                setUsername('');
            } else {
                const errorData = await response.json();
                message.error(`Failed to update password: ${errorData.message}`);
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            message.error('An error occurred while updating the password');
            setError('An error occurred while updating the password');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>
                    <h1 id="title">Update Password</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Text">Student Name</label>
                        <Input
                            placeholder="Enter Name"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <label htmlFor="Text">Arid</label>
                        <br />
                        <Input
                            placeholder='Arid'
                            value={arid}
                            onChange={handleAridChange}
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <Password
                            placeholder='New Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <br />
                        {/* {error && <Alert message={error} type="error" showIcon />} */}
                        <Button type='primary' onClick={handleBack}>Cancel</Button>
                        <Button type='primary' htmlType="submit" disabled={loading}>
                            {loading ? <Spin /> : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
