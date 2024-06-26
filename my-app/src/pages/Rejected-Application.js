import React, { useState, useEffect } from 'react';
import '../Styling/Rejected-Application.css';
import { Button, List, Col, Row, Layout, Avatar } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';

const { Header } = Layout;

const RejectedApplication = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchRejectedApplications = async () => {
            try {
                const response = await fetch(`${EndPoint.rejected}`);
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                } else {
                    console.error('Failed to fetch rejected applications:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching rejected applications:', error);
            }
        };

        fetchRejectedApplications();
    }, []);

    const SelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const Back = () => {
        navigate('/Admin-Dashboard');
    };

    const handleRejectApplication = async (applicationId) => {
        try {
            const response = await fetch(`/api/RejectApplication?applicationId=${applicationId}`, {
                method: 'POST'
            });
            if (response.ok) {
                const updatedApplications = applications.filter(app => app.id !== applicationId);
                setApplications(updatedApplications);
            } else {
                console.error('Failed to reject application:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const filteredApplications = applications.filter(app => app.type === selectedOption);

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
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
                <h2>Rejected Applications</h2>
                <div>
                    <select value={selectedOption} onChange={SelectChange} style={{ width: '100%' }}>
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
                                <Avatar size={64} icon={<UserOutlined />} />
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.id}
                                />
                                <Button onClick={() => handleRejectApplication(item.id)} danger>Reject</Button>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default RejectedApplication;
