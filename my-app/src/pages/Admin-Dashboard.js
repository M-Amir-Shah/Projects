import React, { useState } from 'react';
import { Layout, Card, Row, Col, Drawer, Button, Avatar } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import '../Styling/Admin-Dashboard.css';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import accepted from '../Pictures/Accepted.png'
import rejected from '../Pictures/rejected.png'
import committeeMember from '../Pictures/committee-member.png'
import grader from '../Pictures/grader.png'
import meritbase from '../Pictures/meritbase.png'
import needbase from '../Pictures/needbase.png'


const { Header, Sider, Content } = Layout;
const { Meta } = Card;
export const siderWidth = '15%';

const App = () => {
    const history = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const AcceptedApplication = (event) => {
        event.preventDefault();
        history('/Accepted-Application');
    };
    const RejectedApplication = (event) => {
        event.preventDefault();
        history('/Rejected-Application');
    };
    const MeritBaseApplication = (event) => {
        event.preventDefault();
        history('/AfterLogin');
    };
    const NeedbaseApplication = (event) => {
        event.preventDefault();
        history('/AfterLogin');
    };
    const CommitteeMember = (event) => {
        event.preventDefault();
        history('/AfterLogin');
    };
    const Graders = (event) => {
        event.preventDefault();
        history('/AfterLogin');
    };

    return (
        <div>
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
                            <Button type="primary" onClick={openPopup} style={{ width: '80%' }}>Add Budget Amount</Button>
                            <Button type="primary" onClick={openPopup} style={{ width: '80%', marginTop: '10px' }}>Add New Student</Button>
                            <Button type="primary" onClick={openPopup} style={{ width: '80%', marginTop: '10px' }}>Add New Policies</Button>
                            <Button type="primary" onClick={openPopup} style={{ width: '80%', marginTop: '10px' }}>Add Faculty Member</Button>
                            <Button type="primary" onClick={openPopup} style={{ width: '80%', marginTop: '10px' }}>Add Committee Member</Button>

                            <br />
                            <Button type="primary" onClick={openPopup} style={{ width: '80%', marginTop: '100px' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
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
                            onClick={MeritBaseApplication}
                            hoverable
                            cover={<img src={meritbase} alt="Error loading image" />}
                            className="content-card"
                        >
                            MeritBase Shortlisting
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={NeedbaseApplication}
                            hoverable
                            cover={<img src={needbase} alt="Error loading image" />}
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
                            onClick={AcceptedApplication}
                            hoverable
                            cover={<img src={accepted} alt="Error loading image" />}
                            className="content-card"
                        >
                            Accepted Application
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={RejectedApplication}
                            hoverable
                            cover={<img src={rejected} alt="Error loading image" />}
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
                            onClick={CommitteeMember}
                            hoverable
                            cover={<img src={committeeMember} alt="Error loading image" />}
                            className="content-card"
                        >
                            Committee Member
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                        <Card
                            onClick={Graders}
                            hoverable
                            cover={<img src={grader} alt="Error loading image" />}
                            className="content-card"
                        >
                            Assigning Graders
                        </Card>
                    </Col>
                </Row>
            </Content>
        </div>
    );

}
export default App;

