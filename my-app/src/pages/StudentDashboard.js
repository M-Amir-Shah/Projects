import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Button, Card, Row, Col, Spin, Alert, Drawer, Modal, Typography, message } from 'antd';
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
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [arid_no, setArid_no] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('');
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileId, setProfileId] = useState('');
    const [username, setUsername] = useState('');
    const [session1, setSession] = useState('');
    const [amount, setAmount] = useState(''); // State variable for amount

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

    const fetchSession = async () => {
        try {
            const response = await fetch(`${EndPoint.getSession}`);
            if (!response.ok) throw new Error('Error fetching Session');
            const data = await response.json();
            setSession(data.session1);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplicationStatus = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.checkApplicationStatus}?id=${profileId}`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);

            const data = await response.json();
            console.log("API Response:", data); // Log the entire response

            // If data is null, set applicationStatus to "Not Submitted"
            let applicationStatus = "Not Submitted";
            if (data) {
                // If applicationStatus is null, set it to "Pending"
                applicationStatus = data.applicationStatus ?? "Pending";
            }
            setApplicationStatus(applicationStatus);

        } catch (error) {
            console.error("Error fetching application status:", error.message);
            setError('Failed to fetch application status. Please try again later.');
        }
    };





    useEffect(() => {
        const storedProfileId = localStorage.getItem('profileId');
        const storedUsername = localStorage.getItem('savedUsername');

        if (storedProfileId) {
            setProfileId(storedProfileId);
            fetchStudentInfo(storedProfileId);
            fetchApplicationStatus(storedProfileId);
        } else {
            setLoading(false);
            setError('No profile ID found.');
        }

        if (storedUsername) {
            setUsername(storedUsername);
        }

        fetchSession();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('Status', status)

            const response = await axios.post(EndPoint.decideMeritBaseApplication, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.formData);
            message.success('Added Successfully');
            navigate('/StudentDashboard');
        } catch (error) {
            message.error('Failed to submit');
        }
    };

    const logout = () => {
        Modal.confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                localStorage.clear();
                navigate('/Login');
            },
        });
    };

    const Apply = (profileId) => {
        navigate('/AfterLogin', { state: { profileId } });
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
                                <Title level={4}>{name}</Title>
                                <description level={4}>{arid_no}</description>
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
                            <b>Status:</b> {applicationStatus}<br />
                            <b>Session:</b> <b>{session1}</b><br />
                            {applicationStatus === 'Accepted' && (
                                <>
                                    <b>Amount:</b> <b>{amount}</b><br />
                                    <Button
                                        onClick={handleSubmit}
                                        type='primary'
                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                    >
                                        Accepted
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        type='primary'
                                        style={{ backgroundColor: 'red' }}
                                    >
                                        Rejected
                                    </Button>

                                </>
                            )}
                        </Card>

                        <div className="card-container">
                            <Card
                                onClick={() => Apply(profileId)}
                                hoverable
                                cover={<img src={application} alt="Error loading image" />}
                                className="content-card"
                                disabled={applicationStatus === 'Accepted' || applicationStatus === 'Rejected' || applicationStatus === 'Pending'}
                                style={applicationStatus === 'Accepted' || applicationStatus === 'Rejected' || applicationStatus === 'Pending' ? { pointerEvents: 'none', opacity: 0.5 } : {}}
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
