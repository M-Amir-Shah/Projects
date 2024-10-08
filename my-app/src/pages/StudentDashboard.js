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
    const [aidtype, setAidType] = useState(''); // State variable for aidtype
    const [house,setAmt] = useState('');
    const [five, setFive] = useState('');
    const [ten, setTen] = useState('');
    const [fifteen, setFifteen] = useState('');
    const [twenty, setTwenty] = useState('');



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
    // const fetchAmount = async () => {
    //     try {
    //         const response = await fetch(`${EndPoint.accepted}`);
    //         if (!response.ok) throw new Error('Error fetching Amount');
    //         const data = await response.json();

    //         setAmount(data[1].amount);
    //         console.log('Amount', data[1].amount)
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchApplicationStatus = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.getStudentApplicationStatus}?id=${profileId}`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);

            const data = await response.json();
            console.log("API Response:", data);

            // Default values
            let applicationStatus = "Not Submitted";
            let aidtype = "";
            let amount = "";

            if (data) {
                applicationStatus = data.applicationStatus ?? "Pending";
                aidtype = data.aidtype ?? "";
                amount = data.amount ?? ""; // Extract the amount from the response
            }

            setApplicationStatus(applicationStatus);
            setAidType(aidtype);
            setAmount(amount); // Set the amount in the state

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



    const handleFiveK = async (status) => {
        setLoading(true);
        try {
            console.log('Submitting with ID:', profileId, 'and status:', status); // Debugging line

            // Construct the URL with query parameters
            const url = `http://localhost/Backend/api/Student/decideMeritBaseApplication?id=${profileId}&status=${status}`;

            // Send the POST request with query parameters
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json' // Optional, can be omitted if no body is being sent
                }
            });

            console.log("Response : ", response.data);
            message.success(`${status} Successfully`);
            // Replace navigate('/StudentDashboard');
            window.location.reload();


        } catch (error) {
            message.error('Failed to submit');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };


    const handleTenK = async (status) => {
        setLoading(true);
        try {
            console.log('Submitting with ID:', profileId, 'and status:', status); // Debugging line

            // Construct the URL with query parameters
            const url = `http://localhost/Backend/api/Testing/decideMeritBaseApplication?id=${profileId}&status=${status}`;

            // Send the POST request with query parameters
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json' // Optional, can be omitted if no body is being sent
                }
            });

            console.log("Response : ", response.data);
            message.success(`${status} Successfully`);
            // Replace navigate('/StudentDashboard');
            window.location.reload();


        } catch (error) {
            message.error('Failed to submit');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFifteenK = async (status) => {
        setLoading(true);
        try {
            console.log('Submitting with ID:', profileId, 'and status:', status); // Debugging line

            // Construct the URL with query parameters
            const url = `http://localhost/Backend/api/Committee/decideMeritBaseApplication?id=${profileId}&status=${status}`;

            // Send the POST request with query parameters
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json' // Optional, can be omitted if no body is being sent
                }
            });

            console.log("Response : ", response.data);
            message.success(`${status} Successfully`);
            // Replace navigate('/StudentDashboard');
            window.location.reload();


        } catch (error) {
            message.error('Failed to submit');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTwentyK = async (status) => {
        setLoading(true);
        try {
            console.log('Submitting with ID:', profileId, 'and status:', status); // Debugging line

            // Construct the URL with query parameters
            const url = `http://localhost/Backend/api/User/decideMeritBaseApplication?id=${profileId}&status=${status}`;

            // Send the POST request with query parameters
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json' // Optional, can be omitted if no body is being sent
                }
            });

            console.log("Response : ", response.data);
            message.success(`${status} Successfully`);
            // Replace navigate('/StudentDashboard');
            window.location.reload();


        } catch (error) {
            message.error('Failed to submit');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    
    const handleSubmit = async (status) => {
        setLoading(true);
        try {
            console.log('Submitting with ID:', profileId, 'and status:', status); // Debugging line

            // Construct the URL with query parameters
            const url = `http://localhost/Backend/api/Faculty/decideMeritBaseApplication?id=${profileId}&status=${status}`;

            // Send the POST request with query parameters
            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json' // Optional, can be omitted if no body is being sent
                }
            });

            console.log("Response : ", response.data);
            message.success(`${status} Successfully`);
            // Replace navigate('/StudentDashboard');
            window.location.reload();


        } catch (error) {
            message.error('Failed to submit');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
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
                                </>
                            )}

                            {aidtype === 'MeritBase' && applicationStatus === 'Pending' && (
                                <>
                                    {/* <b>Amount:</b> <b>{amount}</b><br /> */}
                                    <label>Hrs/Week</label>
                                    <br/>
                                    <Button
                                        onClick={() => handleFiveK('Accepted')}
                                        type='primary'
                                        loading={loading}
                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                    >
                                        5 Hrs
                                    </Button>
                                    <Button
                                        onClick={() => handleTenK('Accepted')}
                                        type='primary'
                                        loading={loading}
                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                    >
                                        10 Hrs
                                    </Button>
                                    <Button
                                        onClick={() => handleFifteenK('Accepted')}
                                        type='primary'
                                        loading={loading}
                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                    >
                                        15 Hrs
                                    </Button>
                                    <Button
                                        onClick={() => handleTwentyK('Accepted')}
                                        type='primary'
                                        loading={loading}
                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                    >
                                        20 Hrs
                                    </Button>
                                    
                                    <Button
                                        onClick={() => handleSubmit('Rejected')}
                                        type='primary'
                                        loading={loading}
                                        style={{ backgroundColor: 'red' }}
                                    >
                                        Reject
                                    </Button>
                                    
                                </>
                            )}

                        </Card>

                        <div className="card-container">
                            {/* {aidtype !== 'MeritBase' && ( */}
                            <Card
                                onClick={() => Apply(profileId)}
                                hoverable
                                cover={<img src={application} alt="Error loading image" />}
                                className="content-card"
                                disabled={
                                    applicationStatus === 'Accepted' ||
                                    applicationStatus === 'Rejected' ||
                                    applicationStatus === 'Pending'
                                }
                                style={
                                    applicationStatus === 'Accepted' ||
                                        applicationStatus === 'Rejected' ||
                                        applicationStatus === 'Pending'
                                        ? { pointerEvents: 'none', opacity: 0.5 }
                                        : {}
                                }
                            >
                                Apply Needbase
                            </Card>
                            {/* )} */}



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