import React, { useState, useEffect } from 'react';
import '../Styling/Decline-Amount.css';
import { Button, List, Col, Row, Layout, Avatar, message } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';
import logo from './BiitLogo.jpeg';

const { Header } = Layout;

const fetchStudentRecords = async () => {
    try {
        const response = await fetch(EndPoint.meritRejected);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student records:', error);
        message.error('Failed to load student records.');
        return [];
    }
};

const StudentRecords = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStudentRecords = async () => {
            setLoading(true);
            const data = await fetchStudentRecords();
            setApplications(data);
            setLoading(false);
        };

        loadStudentRecords();
    }, []);

    const Back = () => {
        navigate('/Admin-Dashboard');
    };


    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Student Rejected Amount
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Records</h2>
                <form>
                    <div className="scrollable-list">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={applications}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                            title={`${item.name} (${item.arid_no})`}
                                            description={"Rejected Amount: "+item.amount}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRecords;
