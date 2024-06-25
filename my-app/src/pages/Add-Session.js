import React, { useState } from 'react';
import { Layout, Row, Col, Button, DatePicker, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import "../Styling/Budget.css";
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import EndPoint from '../endpoints';

const { Header } = Layout;

const Session = () => {
    const navigate = useNavigate();
    
    // State variables
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleStart = (date, dateString) => {
        setStartDate(dateString);
    }
    const handleEnd = (date, dateString) => {
        setEndDate(dateString);
    }
    const Back = (event) => {
        event.preventDefault();
        navigate('/Admin-Dashboard');
    };

    const handleFormSubmit = async () => {
        try {
            // Format the dates to match the format expected by the backend
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            const formattedLastDate = calculateLastDate(formattedStartDate);

            // Construct the URL with query parameters
            const url = `${EndPoint.addSession}?name=${name}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&lastDate=${formattedLastDate}`;

            // Send the request
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            message.success('Session added successfully');
            navigate('/Admin-Dashboard')
        } catch (error) {
            console.error('Error adding session', error);
            message.error('Failed to add session');
        }
    };

    // Format date function
    const formatDate = (date) => {
        if (!date) return ''; // Handle case when date is null or undefined
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = d.getDate().toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // Calculate last date function
    const calculateLastDate = (startDate) => {
        if (!startDate) return ''; // Handle case when startDate is null or undefined
        const d = new Date(startDate);
        d.setDate(d.getDate() + 10); // Add 10 days to the start date
        return formatDate(d);
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={Back} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Add Session
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content className="form-box">
                    <h2 style={{ textAlign: 'center' }}>Add Session</h2>
                    <Form layout="vertical" onFinish={handleFormSubmit}>
                        <Form.Item>
                            <Input
                                placeholder="Fall-2024, Summer-YYYY, Spring-YYYY"
                                onChange={handleName}
                                value={name}
                            />
                        </Form.Item>
                        <Form.Item label="Start Session">
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Select Start Date"
                                onChange={handleStart}
                            />
                        </Form.Item>
                        <Form.Item label="End Session">
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Select End Date"
                                onChange={handleEnd}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Add Session
                            </Button>
                            <Button type="default" htmlType="button" onClick={Back}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        </div>
    );
};

export default Session;
