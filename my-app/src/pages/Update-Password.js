import React, { useState } from 'react';
import '../Styling/Update-Password.css';
import Input from '../components/Input';
import Password from '../components/Password';
import { message,Button } from 'antd';
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const [arid, setArid] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();
    const AridChange = (event) => {
        setArid(event.target.value);
    };

    const PasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const Submit = (event) => {
        event.preventDefault();
        setArid('');
        setPassword('');
    };
    const Done = (event) => {
        message.success('Updated')
    };
    const Back = (event) => {
        history(-1);
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>
                    <h1 id="title">Update Password</h1>
                </header>
                <form onSubmit={Submit}>
                    <div>
                        <div>
                        <label htmlFor="Text">Student Name</label>
                        <Input placeholder="Enter Name" />

                        <label htmlFor="Text">Arid</label>
                        <br />
                        <Input placeholder='Arid' />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <Password placeholder='New Password' />
                        
                        </div>
                        <br />
                        <Button type='primary' onClick={Back}>Back</Button>
                        <Button type='primary' onClick={Done}>Update</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;