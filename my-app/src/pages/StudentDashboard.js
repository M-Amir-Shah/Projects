import React from 'react';
import application from '../Pictures/apply.png';
import need from '../Pictures/form.png';
import Criteria from '../Pictures/Criteria.png';
import help from '../Pictures/Help.png';
import { Layout, Avatar, Button, Card, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import '../Styling/StudentDashboard.css';
import { useNavigate } from "react-router-dom";


const { Header, Sider, Content } = Layout;

export const siderWidth = '15%';

const App = () => {
    const history = useNavigate();
    
    const logout = (event) => {
        event.preventDefault();
        history(-1);
    };
    const Apply = (event) => {
        event.preventDefault();
        history('/AfterLogin');
    };

    const NeedCriteria = (event) => {
        event.preventDefault();
        history('/Help');
    };

    const MeritCriteria = (event) => {
        event.preventDefault();
        history('/Help');
    };

    const HelpCriteria = (event) => {
        event.preventDefault();
        history('/Help');
    };

    return (
        <div className='container'>
            <Layout className="app-layout">
                <Sider width={siderWidth} className="app-sider">
                    <div className="sider-content">
                        <Avatar size={64} icon={<UserOutlined />} />
                    </div>
                    <div>
                        <Button type="text" classNames="logout" icon={<LogoutOutlined />} className="logout-button" onClick={logout}>Logout</Button>
                    </div>
                </Sider>
                <Layout>
                    <Header className="app-header">Student Dashboard</Header>
                    <Content className="app-content">
                        <Card title="Welcome" className="welcome-card">Muhammad Amir Shahzad<br />2020-Arid-3690<br />Status Pending</Card>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card
                                    onClick={Apply}
                                    hoverable
                                    cover={<img src={application} alt="Error loading image" />}
                                    className="content-card"
                                >
                                    Apply Needbase
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                onClick={NeedCriteria}
                                    hoverable // Add hoverable property here
                                    cover={<img src={need} alt="Error loading image" />}
                                    className="content-card"
                                >
                                    Needbase Criteria
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                onClick={MeritCriteria}
                                    hoverable // Add hoverable property here
                                    cover={<img src={Criteria} alt="Error loading image" />}
                                    className="content-card"
                                >
                                    MeritBase Criteria
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                onClick={HelpCriteria}
                                    hoverable // Add hoverable property here
                                    cover={<img src={help} alt="Error loading image" />}
                                    className="content-card"
                                >
                                    Need Help
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
