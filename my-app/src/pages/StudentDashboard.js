// import React from 'react';
// import application from '../Pictures/apply.png';
// import need from '../Pictures/form.png';
// import Criteria from '../Pictures/Criteria.png';
// import help from '../Pictures/Help.png';
// import { Layout, Avatar, Button, Card, Row, Col } from 'antd';
// import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
// import '../Styling/StudentDashboard.css';
// import { useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// export const siderWidth = '15%';

// const App = () => {
//     const navigate = useNavigate();

//     const logout = (event) => {
//         event.preventDefault();
//         navigate(-1);
//     };
//     const Apply = (event) => {
//         event.preventDefault();
//         navigate('/AfterLogin');
//     };

//     const NeedCriteria = (event) => {
//         event.preventDefault();
//         navigate('/Help');
//     };

//     const MeritCriteria = (event) => {
//         event.preventDefault();
//         navigate('/Help');
//     };

//     const HelpCriteria = (event) => {
//         event.preventDefault();
//         navigate('/Help');
//     };

//     return (
//         <div className='container'>
//             <Layout>
//                 <Sider width={siderWidth} className="app-sider">
//                     <div className="sider-content">
//                         <Avatar size={64} icon={<UserOutlined />} />
//                     </div>
//                     <div>
//                         <Button 
//                             type="primary" 
//                             onClick={logout} 
//                             icon={<LogoutOutlined />} 
//                             style={{ 
//                                 width: '80%', 
//                                 margin: '0 10px', 
//                                 display: 'block', 
//                                 marginLeft: 'auto', 
//                                 marginRight: 'auto' 
//                             }}
//                         >
//                             Logout
//                         </Button>
//                     </div>
//                 </Sider>
//                 <Layout>
//                     <Header className="app-header">Student Dashboard</Header>
//                     <Content className="app-content">
//                         <Card title="Welcome" className="welcome-card">
//                             Muhammad Amir Shahzad<br />
//                             2020-Arid-3690<br />
//                             Status Pending
//                         </Card>
//                         <Row gutter={16}>
//                             <Col span={6}>
//                                 <Card
//                                     onClick={Apply}
//                                     hoverable
//                                     cover={<img src={application} alt="Error loading image" />}
//                                     className="content-card"
//                                 >
//                                     Apply Needbase
//                                 </Card>
//                             </Col>
//                             <Col span={6}>
//                                 <Card
//                                     onClick={NeedCriteria}
//                                     hoverable
//                                     cover={<img src={need} alt="Error loading image" />}
//                                     className="content-card"
//                                 >
//                                     Needbase Criteria
//                                 </Card>
//                             </Col>
//                             <Col span={6}>
//                                 <Card
//                                     onClick={MeritCriteria}
//                                     hoverable
//                                     cover={<img src={Criteria} alt="Error loading image" />}
//                                     className="content-card"
//                                 >
//                                     MeritBase Criteria
//                                 </Card>
//                             </Col>
//                             <Col span={6}>
//                                 <Card
//                                     onClick={HelpCriteria}
//                                     hoverable
//                                     cover={<img src={help} alt="Error loading image" />}
//                                     className="content-card"
//                                 >
//                                     Need Help
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Content>
//                 </Layout>
//             </Layout>
//         </div>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Button, Card, Row, Col, Spin, Alert } from 'antd';
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Drawer } from 'antd';
import EndPoint from '../endpoints'; // Importing the EndPoint object
import application from '../Pictures/apply.png';
import need from '../Pictures/form.png';
import Criteria from '../Pictures/Criteria.png';
import help from '../Pictures/Help.png';
import logo from './BiitLogo.jpeg'

const { Header, Content } = Layout;

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [status, setStatus] = useState('');
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(EndPoint.getStudentInfo)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setName(data.name);
                setStudentId(data.studentId);
                setStatus(data.status);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const logout = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const Apply = (event) => {
        event.preventDefault();
        navigate('/ApplyNeedBase'); // Assuming you have a route for applying for need-based aid
    };

    const NeedCriteria = (event) => {
        event.preventDefault();
        navigate('/NeedbaseCriteria'); // Assuming you have a route for viewing need-based criteria
    };

    const MeritCriteria = (event) => {
        event.preventDefault();
        navigate('/MeritbaseCriteria'); // Assuming you have a route for viewing merit-based criteria
    };

    const HelpCriteria = (event) => {
        event.preventDefault();
        navigate('/Help'); // Assuming you have a route for help
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    return (
        <div className='container'>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <div style={{ padding: "5px" }}>
                            <Button icon={<BarsOutlined />} onClick={showDrawer} />
                        </div>
                        <Drawer
                            placement="left"
                            width={300}
                            closable={true}
                            onClose={onClose}
                            visible={isDrawerVisible}
                            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <div className="sider-content">
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <br />
                            <Button type="primary" onClick={logout} icon={<LogoutOutlined />} style={{ width: '80%' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Student-DashBoard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content>
                {loading ? (
                    <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
                ) : error ? (
                    <Alert message="Error" description="There was an error fetching the data." type="error" showIcon />
                ) : (
                    <>
                        <Card title="Welcome" className="welcome-card">
                            Name: {name}<br />
                            Arid: {studentId}<br />
                            Status: {status}
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
        </div>
    );
}

export default StudentDashboard;
