import React, { useState, useEffect } from 'react';
import { Card, Layout, Row, List, Col, Badge, Drawer, Button, Avatar, Modal, message, Typography } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined, BarsOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import EndPoint from '../endpoints'; // Import your API endpoints file
import logo from './BiitLogo.jpeg';
import '../Styling/Committee-DashBoard.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const DocumentCard = ({ document }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Save the selected document data to localStorage
        localStorage.setItem('selectedApplication', JSON.stringify(document));
        navigate('/View-Application', { state: { documentId: document.id } });
    };

    const getDocumentIcon = (fileName) => {
        if (typeof fileName !== 'string') {
            console.error(`Expected a string for fileName but got ${typeof fileName}`);
            return <FileImageOutlined style={{ fontSize: '100px' }} />;
        }

        const fileType = fileName.split('.').pop().toLowerCase();
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
            cover={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>{getDocumentIcon(document.EvidenceDocuments)}</div>}
            onClick={handleClick}
        >
            <Meta title={document.name} />
            <Meta description={document.arid_no} />
        </Card>
    );
};

const App = ({ id }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [committeeInfo, setCommitteeInfo] = useState({ name: '', profilePic: '' });
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [showListModal, setShowListModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${EndPoint.getApplication}?id=${1}`);
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
                message.error('Failed to fetch documents data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [id]);

    useEffect(() => {
        const fetchCommitteeInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${EndPoint.committeeMemberInfo}?id=${id}`);
                setCommitteeInfo(response.data);
                setName(response.data.name); // Set the name here
            } catch (error) {
                console.error('Error fetching committee info:', error);
                // Handle error here
            } finally {
                setLoading(false);
            }
        };

        fetchCommitteeInfo();
    }, [id]);

    const logout = () => {
        navigate('/Login');
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${EndPoint.notifications}`);
            const result = await response.json();
            console.log('Notification Fetched data:', result); // Log the data to verify its structure
            setData(result.sort((a, b) => b.feedback - a.feedback));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch
    }, []);

    const balanceCheck = async () => {
        try {
            const response = await axios.get(EndPoint.getBalance);
            console.log('API Response:', response.data);
            const budgetList = response.data;
            setRemainingBalance(budgetList || 0);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching balance data:', error);
            message.error('Failed to fetch balance data.');
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };
    const navigateTo = (path) => {
        navigate(path);
    };

    const handleBellClick = () => {
        setShowListModal(true);
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
                            <Title level={4}>{facultyInfo && (
                                    <>
                                        <Avatar
                                            src={facultyInfo?.profilePic ? `${EndPoint.imageUrl}${facultyInfo.profilePic}` : "./logo.png"}
                                            size={64}
                                        />
                                        <h2>{facultyInfo.name}</h2>
                                    </>
                                )}</Title>
                            </div>
                            <br />
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Faculty-Dashboard')}>Switch to Faculty</Button>
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={balanceCheck}>Remaining Balance</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Committee-Dashboard
                    </Col>
                    <Col>
                        <Button onClick={handleBellClick} icon={<BellOutlined />} />
                    </Col>
                </Row>
            </Header>
            <Content className='container'>
                <div>
                    <Card
                        title="Remaining Application"
                        style={{
                            width: 500,
                            margin: '20px auto',
                        }}
                    >
                        <p className='card-para'>Left <sup><Badge count={documents.length} /></sup></p>
                    </Card>
                    <br />
                    <div className="scrollable-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            documents.map((document, index) => (
                                <DocumentCard key={index} document={document} />
                            ))
                        )}
                    </div>
                </div>
            </Content>
            <Modal
                title="Remaining Balance"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleModalOk}>
                        OK
                    </Button>,
                ]}
            >
                <p>Remaining Balance is: {remainingBalance}</p>
            </Modal>
            <Modal
                title="Notifications List"
                visible={showListModal}
                onCancel={() => setShowListModal(false)}
                footer={[
                    <Button key="close" onClick={() => setShowListModal(false)}>
                        Close
                    </Button>,
                ]}
            >
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                    title={`${item.name} (${item.arid_no})`}
                                    description={`Rating: ${item.feedback} | (${item.session})`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default App;
