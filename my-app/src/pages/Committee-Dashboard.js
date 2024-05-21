import React, { useState } from 'react';
import { Card, Layout, Row, Col, Badge, Drawer, Button, Avatar, message } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
import '../Styling/Committee-DashBoard.css';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import Search from '../components/SearchingButton';

const { Header, Content } = Layout;
const { Meta } = Card;

const DocumentCard = ({ document }) => {
    const handleClick = () => {
        // Add your click handler logic here, for example:
        message.info(`You clicked on ${document.title}`);
    };

    const getDocumentIcon = () => {
        const fileType = document.type.toLowerCase();
        if (fileType === 'pdf') {
            return <FilePdfOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'xls' || fileType === 'xlsx') {
            return <FileExcelOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'jpeg' || fileType === 'png') {
            return <FileImageOutlined style={{ fontSize: '100px' }} />;
        } else {
            return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon for unsupported file types
        }
    };

    return (
        <Card
            style={{ width: 300, margin: '20px', cursor: 'pointer' }}
            cover={getDocumentIcon()}
            onClick={handleClick}
        >
            <Meta title={document.title} />
            <Meta description={document.description} />
        </Card>
    );
};

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

    const BalanceCheck = () => {
        message.success('Remaining Balance is $500.'); // Show info message
    };

    const [show, setShow] = useState(true);
    const documents = [
        { title: 'Awais', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Shahzad', description: 'This is an image document', type: 'jpeg' },
        { title: 'Usman', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Ahmad', description: 'This is an Excel document', type: 'xls' },
        { title: 'Zain', description: 'This is an image document', type: 'jpeg' },
        { title: 'Amir', description: 'This is an Excel document', type: 'xls' },
        { title: 'Awais', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Shahzad', description: 'This is an image document', type: 'jpeg' },
        { title: 'Usman', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Zain', description: 'This is an image document', type: 'jpeg' },
        { title: 'Amir', description: 'This is an Excel document', type: 'xls' },
    ];

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
                            <Button type="primary" onClick={BalanceCheck} style={{ width: '80%' }}>Remaining Amount</Button>
                            <br />
                            <Button type="primary" onClick={openPopup} style={{ width: '80%' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Committee-DashBoard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className='content'>
                <div>
                    <Card
                        title="Remaining Application"
                        style={{
                            width: 500,
                            margin: '20px auto',
                        }}
                    >
                        <p className='card-para'>Left<sup><Badge count={show ? 12 : 0} /></sup></p>
                    </Card>
                    <Search placeholder="Search" />
                    <br />
                    <div className="card-container">
                        {documents.map((document, index) => (
                            <DocumentCard key={index} document={document} />
                        ))}
                    </div>
                </div>
            </Content>
        </div>
    );
};

export default App;
