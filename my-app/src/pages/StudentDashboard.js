import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Button, Card, Row, Col, Spin, Alert, Drawer, message } from 'antd';
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints'; // Importing the EndPoint object
import application from '../Pictures/apply.png';
import need from '../Pictures/form.png';
import Criteria from '../Pictures/Criteria.png';
import help from '../Pictures/Help.png';
import logo from './BiitLogo.jpeg';
import '../Styling/StudentDashboard.css';

const { Header, Content } = Layout;

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [arid_no, setArid_no] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('');
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileId, setProfileId] = useState('');
    const [username, setUsername] = useState('');

    const fetchStudentInfo = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.getStudentInfo}?id=${profileId}`);
            if (!response.ok) throw new Error('Error fetching student info');
            const data = await response.json();
            setName(data.name);
            setArid_no(data.arid_no);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplicationStatus = async (profileId) => {
        try {
            const response = await fetch('http://192.168.207.81/Backend/api/Student/getStudentApplicationStatus?id='+profileId);
            if (!response.ok) throw new Error('Error fetching application status');
            const data = await response.json();
            setApplicationStatus(data.applicationStatus);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const storedProfileId = localStorage.getItem('profileId');
        const storedUsername = localStorage.getItem('savedUsername');

        if (storedProfileId) {
            setProfileId(storedProfileId);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedProfileId) {
            fetchStudentInfo(storedProfileId);
            console.log(storedProfileId)
            fetchApplicationStatus(storedProfileId);
        } else {
            setLoading(false);
            setError('No profile ID found in local storage.');
        }
    }, []);

    const navigateToScholarship = () => {
        if (!applicationStatus || applicationStatus === 'Rejected') {
            navigate("/INFOFROM");
        } else {
            message.error('Your scholarship application is currently being processed.');
        }
    };

    const logout = (event) => {
        event.preventDefault();
        localStorage.clear(); // Clear local storage on logout
        navigate('/Login');
    };

    const Apply = () => {
        navigateToScholarship();
    };

    const NeedCriteria = () => {
        navigate('/Needbase-Criteria');
    };

    const MeritCriteria = () => {
        navigate('/Meritbase-Criteria');
    };

    const HelpCriteria = () => {
        navigate('/Help');
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    return (
        <Layout>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<BarsOutlined />} onClick={showDrawer} />
                        <Drawer
                            placement="left"
                            width={300}
                            closable={true}
                            onClose={onClose}
                            visible={isDrawerVisible}
                        >
                            <div className="sider-content">
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <br />
                            <Button type="primary" onClick={logout} icon={<LogoutOutlined />} style={{ width: '80%' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#fff' }}>
                        BIIT Student Dashboard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className='container'>
                {loading ? (
                    <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
                ) : error ? (
                    <Alert message="Error" description={error} type="error" showIcon />
                ) : (
                    <>
                        <Card title="Welcome" className="welcome-card">
                            <b>Name:</b> {name}<br />
                            <b>Arid :</b> {arid_no}<br />
                            <b>Status:</b> {applicationStatus}
                        </Card>
                        <div className="card-container">
                            <Card
                                onClick={Apply}
                                hoverable
                                cover={<img src={application} alt="Error loading image" />}
                                className="content-card"
                            >
                                Apply Needbase
                            </Card>
                            <Card
                                onClick={NeedCriteria}
                                hoverable
                                cover={<img src={need} alt="Error loading image" />}
                                className="content-card"
                            >
                                Needbase Criteria
                            </Card>
                            <Card
                                onClick={MeritCriteria}
                                hoverable
                                cover={<img src={Criteria} alt="Error loading image" />}
                                className="content-card"
                            >
                                Meritbase Criteria
                            </Card>
                            <Card
                                onClick={HelpCriteria}
                                hoverable
                                cover={<img src={help} alt="Error loading image" />}
                                className="content-card"
                            >
                                Need Help
                            </Card>
                        </div>
                    </>
                )}
            </Content>
        </Layout>
    );
}

export default StudentDashboard;
