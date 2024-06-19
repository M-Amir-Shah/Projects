import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Button, Card, Row, Col, Spin, Alert, Drawer, Modal, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints'; // Importing the EndPoint object
import application from '../Pictures/apply.png';
import need from '../Pictures/form.png';
import Criteria from '../Pictures/Criteria.png';
import help from '../Pictures/Help.png';
import logo from './BiitLogo.jpeg';
import '../Styling/StudentDashboard.css';
import Image from '../Pictures/admin.jpg';

const { Header, Content } = Layout;
const { Title } = Typography;

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
            const response = await fetch(`${EndPoint.checkApplicationStatus}?id=${profileId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            const data = await response.json();
            // Ensure the data object and applicationStatus property are valid
            if (data && data.applicationStatus !== undefined) {
                setApplicationStatus(data.applicationStatus);
            } else {
                setApplicationStatus('Not Submitted');
            }
            console.log('Fetched application status:', data);
        } catch (error) {
            console.error('Error fetching application status:', error);
            setError('Failed to fetch application status. Please try again later.');
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
            setError('No profile ID found.'); // in local Storage
        }
    }, []);

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

    const Apply = (profileId) => {
        navigate('/AfterLogin', { state: { profileId: profileId } });
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
                                <Avatar size={64} src={Image} />
                                <Title level={4}>{name}</Title> {/* Display student's name here */}
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
                            <b>Name:</b> <input type="text" value={name} disabled /><br />
                            <b>Arid :</b> <input type="text" value={arid_no} disabled /><br />
                            <b>Status:</b> {applicationStatus}
                        </Card>
                        <div className="card-container">
                            <Card
                                onClick={() => Apply(profileId)}
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
