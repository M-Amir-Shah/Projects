import React, { useState } from 'react';
import { Layout, Card, Row, Col, Drawer, Button, Avatar } from 'antd';
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

const { Header, Content } = Layout;

const App = () => {
    const navigate = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const navigateTo = (path) => {
        navigate(path);
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
                            closable
                            onClose={onClose}
                            visible={isDrawerVisible}
                            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Avatar size={64} icon={<UserOutlined />} />
                            <br />
                            <Button type="primary" style={{ width: '80%' }} onClick={() => navigateTo('/add-budget')}>Add Budget Amount</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/add-student')}>Add New Student</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/add-policies')}>Add New Policies</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/add-faculty')}>Add Faculty Member</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/add-committee')}>Add Committee Member</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '100px' }} onClick={() => navigateTo('/logout')}>Logout</Button>
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
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/merit-base')}
                            hoverable
                            cover={<img src={meritbase} alt="Merit Base" />}
                            className="content-card"
                        >
                            MeritBase Shortlisting
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/need-base')}
                            hoverable
                            cover={<img src={needbase} alt="Need Base" />}
                            className="content-card"
                        >
                            Needbase Application
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/accepted-application')}
                            hoverable
                            cover={<img src={accepted} alt="Accepted" />}
                            className="content-card"
                        >
                            Accepted Application
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/rejected-application')}
                            hoverable
                            cover={<img src={rejected} alt="Rejected" />}
                            className="content-card"
                        >
                            Rejected Application
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/committee-member')}
                            hoverable
                            cover={<img src={committeeMember} alt="Committee Member" />}
                            className="content-card"
                        >
                            Committee Member
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={() => navigateTo('/graders')}
                            hoverable
                            cover={<img src={grader} alt="Graders" />}
                            className="content-card"
                        >
                            Assigning Graders
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default App;
