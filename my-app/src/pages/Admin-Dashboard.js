import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Row, Col, Drawer, Button, Avatar, Modal, Typography } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import '../Styling/Admin-Dashboard.css';
import logo from './BiitLogo.jpeg';
import accepted from '../Pictures/Accepted.png';
import rejected from '../Pictures/rejected.png';
import committeeMember from '../Pictures/committee-member.png';
import grader from '../Pictures/grader.png';
import meritbase from '../Pictures/meritbase.png';
import needbase from '../Pictures/needbase.png';
import Image from '../Pictures/ca.jpg';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
    const navigate = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [data, setData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    const logout = () => {
        Modal.confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                localStorage.clear(); // Clear local storage on logout
                navigate('/Login');
            },
        });
    };

    const name = "AbdulIslam"; // Define the name variable here

    return (
        <Layout>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<BarsOutlined />} onClick={showDrawer} />
                        <Drawer
                            placement="left"
                            width={300}
                            closable
                            onClose={onClose}
                            visible={isDrawerVisible}
                            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Avatar size={64} src={Image} />
                            <Title level={4}>{name}</Title>
                            <div style={{ marginBottom: '20px' }}>
                                <Typography.Text>
                                    {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                                </Typography.Text>
                            </div>
                            <Button type="primary" style={{ width: '80%' }} onClick={() => navigateTo('/Budget')}>Add Budget Amount</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Student-Record')}>Students Records</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Policies')}>View Policies</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Add-Faculty-Member')}>Add Faculty Member</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Add-New-Committee-Member')}>Add Committee Member</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Add-Session')}>Add Session</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Allocation-Sheet')}>Allocation Sheet</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '100px' }} onClick={logout}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'x-large', color: '#fff' }}>
                        BIIT
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className='container'>
                <div className="card-container">
                    <Card
                        onClick={() => navigateTo('/merit-base-short-listing')}
                        hoverable
                        cover={<img src={meritbase} alt="Merit Base" />}
                        className="content-card"
                    >
                        MeritBase Shortlisting
                    </Card>
                    <Card
                        onClick={() => navigateTo('/Admin-ViewApplication-List')}
                        hoverable
                        cover={<img src={needbase} alt="Need Base" />}
                        className="content-card"
                    >
                        Needbase Application
                    </Card>
                    <Card
                        onClick={() => navigateTo('/accepted-application')}
                        hoverable
                        cover={<img src={accepted} alt="Accepted" />}
                        className="content-card"
                    >
                        Accepted Application
                    </Card>
                    <Card
                        onClick={() => navigateTo('/rejected-application')}
                        hoverable
                        cover={<img src={rejected} alt="Rejected" />}
                        className="content-card"
                    >
                        NeedBase Rejected Application
                    </Card>
                    <Card
                        onClick={() => navigateTo('/Meritbase-Rejected')}
                        hoverable
                        cover={<img src={rejected} alt="Rejected" />}
                        className="content-card"
                    >
                        MeritBase Rejected Application
                    </Card>
                    <Card
                        onClick={() => navigateTo('/Committee-Members')}
                        hoverable
                        cover={<img src={committeeMember} alt="Committee Member" />}
                        className="content-card"
                    >
                        Committee Member
                    </Card>
                    <Card
                        onClick={() => navigateTo('/Assign-Graders')}
                        hoverable
                        cover={<img src={grader} alt="Graders" />}
                        className="content-card"
                    >
                        Assigning Graders
                    </Card>
                </div>
                {data && <div className="data-container">
                    {/* Render your data here */}
                    {JSON.stringify(data)}
                </div>}
            </Content>
        </Layout>
    );
};

export default App;
