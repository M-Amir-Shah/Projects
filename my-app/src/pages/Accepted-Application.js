import React, { useState, useEffect } from 'react';
import '../Styling/Accepted-Application.css';
import { Button, List, Col, Row, Layout, Avatar } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';

const { Header } = Layout;

const fetchAcceptedApplications = async () => {
    try {
        const response = await fetch(EndPoint.accepted);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student records:', error);
        return [];
    }
};

const AcceptedApplication = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAcceptedApplications = async () => {
            setLoading(true);
            const data = await fetchAcceptedApplications();
            setApplications(data);
            setLoading(false);
        };
        loadAcceptedApplications();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleBack = () => {
        navigate('/Admin-Dashboard');
    };

    const filteredApplications = selectedOption 
        ? applications.filter(app => app.type === selectedOption)
        : applications;

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2>Accepted Applications</h2>
                <div>
                    <select value={selectedOption} onChange={handleSelectChange} style={{ width: '100%', textAlign: 'center' }}>
                        <option value="">---Select---</option>
                        <option value="needbase">NeedBase</option>
                        <option value="meritbase">MeritBase</option>
                    </select>
                </div>
                <div className="scrollable-list">
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredApplications}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                    title={item.name}
                                    description={item.arid_no}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default AcceptedApplication;
