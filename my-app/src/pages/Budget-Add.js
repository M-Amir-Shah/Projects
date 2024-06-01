import React, { useState } from 'react';
import { Layout, Row, Col, Button, Input, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import "../Styling/Budget.css";
import axios from 'axios';
import EndPoint from '../endpoints';
import { Content } from 'antd/es/layout/layout';

const { Header } = Layout;

const AddNewBudget = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false); // Define setLoading here

    const handleBack = () => {
        navigate('/Budget');
    };

    const handleSubmit = async () => {
        try {
            if (!amount) {
                message.error('Enter amount.');
                return;
            }
    
            setLoading(true);  // Set loading to true when the request starts
    
            // Introduce a 5-second delay
            await new Promise(resolve => setTimeout(resolve, 5000));
    
            const url = `${EndPoint.addBudget}?amount=${amount}`;
            console.log('Endpoint:', url);
    
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response data:', response.data);
    
            message.success('Budget added successfully');
            navigate('/Budget');
        } catch (error) {
            console.error('Error adding budget:', error.response ? error.response.data : error.message);
            message.error('Failed to add budget. Please try again later.');
        } finally {
            setLoading(false);  // Reset loading state after the request completes
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
                    {loading && <Spin />} {/* Show the loading spinner if loading is true */}
                </Content>
            </div>
        </div>
    );
};

export default AddNewBudget;
