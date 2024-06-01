import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../Styling/Help.css';  // Assuming your CSS is in this file
import logo from './BiitLogo.jpeg';
import { EnvironmentOutlined, MobileOutlined, PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const Navbar = () => {
    const history = useNavigate();

    const Back = (event) => {
        event.preventDefault();
        history('/StudentDashboard');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Help
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT logo" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className="container">
                <div className="form-box">
                    <p className="contact-details">
                    <b><EnvironmentOutlined /> BIIT : </b> 106-A/1 Murree Rd, Block A Satellite Town Rawalpindi, Pakistan
                            <b><MobileOutlined /> Mobile Number : </b> (+92) 336-0572652
                            <b><PhoneOutlined /> Landline Number : </b>(+92-51) 4251766, 4251767, 8731506, 8731509
                            <b><MailOutlined /> Email : </b>
                            <a href="mailto:admissions@biit.edu.pk">
                                admissions@biit.edu.pk
                            </a>
                            <b><FacebookOutlined /> Facebook : </b>
                            <a href="https://www.facebook.com/BIITOfficial?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer">
                                BIIT Official Facebook
                            </a>
                            <b><InstagramOutlined /> Instagram : </b>
                            <a href="https://www.instagram.com/biitofficial?igsh=bjA5MzNrZHJ2MGly" target="_blank" rel="noopener noreferrer">
                                BIIT Official Instagram
                            </a>
                    </p>
                </div>
            </Content>
        </Layout>
    );
};

export default Navbar;
