import React, { useState } from 'react';
import { Layout, Row, Col, Button, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import "../Styling/Budget.css";
import EndPoint from '../endpoints.js';
import { Content } from 'antd/es/layout/layout';

const { Header } = Layout;

const AddNewBudget = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');

    const handleBack = () => {
        navigate('/Budget');
    };

    const handleSubmit = async () => {
        try {
            // Ensure amount is a number and not empty
            if (!amount || isNaN(amount)) {
                message.error('Enter amount.');
                return;
            }

            const requestBody = { amount: parseFloat(amount) };

            const response = await fetch(`${EndPoint.addBudget}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            // Log the request body and endpoint for debugging
            console.log('Request body:', JSON.stringify(requestBody));
            console.log('Endpoint:', EndPoint.addBudget);

            if (!response.ok) {
                throw new Error('Failed to add budget');
            }

            const data = await response.json();

            // Log the response data for debugging
            console.log('Response data:', data);

            message.success('Budget added successfully');
            navigate('/Budget');
        } catch (error) {
            console.error('Error adding budget:', error);
            message.error('Failed to add budget. Please try again later.');
        }
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Add New Budget
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content>
                    <label htmlFor="amount">Amount</label>
                    <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        type="number"
                    />
                    <br />
                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                </Content>
            </div>
        </div>
    );
};

export default AddNewBudget;
