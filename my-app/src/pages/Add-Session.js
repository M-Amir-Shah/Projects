import React, { useState } from 'react';
import { Layout, Row, Col, Button, Select, DatePicker, Form, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import "../Styling/Budget.css";
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import EndPoint from '../endpoints';

const { Header } = Layout;
const { Option } = Select;

const Session = () => {
    const navigate = useNavigate();
    
    // State variables
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const Back = (event) => {
        event.preventDefault();
        navigate('/Admin-Dashboard');
    };

    const handleFormSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('startDate', formatDate(startDate)); // Format startDate
            formData.append('endDate', formatDate(endDate)); // Format endDate
    
            const response = await axios.post(`${EndPoint.addSession}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            message.success('Added Successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    // Format date function
    const formatDate = (date) => {
        if (!date) return ''; // Handle case when date is null or undefined
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero based
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
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
                        <Form.Item label="Session">
                            <Select
                                placeholder="Select Session"
                                onChange={(value) => setName(value)}
                                value={name}
                            >
                                <Option value="Fall">Fall</Option>
                                <Option value="Summer">Summer</Option>
                                <Option value="Spring">Spring</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Start Session">
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Select Start Date"
                                onChange={(date, dateString) => setStartDate(date)}
                                value={startDate}
                            />
                        </Form.Item>
                        <Form.Item label="End Session">
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Select End Date"
                                onChange={(date, dateString) => setEndDate(date)}
                                value={endDate}
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
            {/* Display formatted dates */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Formatted Start Date: {startDate && formatDate(startDate)}</p>
                <p>Formatted End Date: {endDate && formatDate(endDate)}</p>
            </div>
        </div>
    );
};

export default Session;
