import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, List, Avatar, Rate, message, Col, Row, Layout, Typography, Drawer,Spin } from 'antd'; // Import Ant Design components
import { BarsOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints';
import axios from 'axios';
import logo from './BiitLogo.jpeg';
import { useNavigate } from "react-router-dom";
import "../Styling/Faculty-Dashboard.css"

const { Header } = Layout;
const { Title } = Typography;
const { TextArea } = Input; // Use TextArea for multiline input

const FormScreen = () => {
    const navigateTo = useNavigate();
    const [data, setData] = useState([]); // Default to an empty array
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [profileId, setProfileId] = useState(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getStoredProfileId();
    }, []);

    const getStoredProfileId = async () => {
        try {
            const storedProfileId = localStorage.getItem('profileId');
            if (storedProfileId) {
                setProfileId(storedProfileId);
                console.log('Profile ID:', storedProfileId);
                fetchFacultyInfo(storedProfileId);
                fetchData(storedProfileId);
            } else {
                console.log('Profile ID not found in localStorage');
            }
        } catch (error) {
            console.error('Error retrieving profile ID from localStorage:', error);
        }
    };

    const fetchFacultyInfo = (profileId) => {
        fetch(`${EndPoint.facultyInfo}?id=${profileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(async data => {
                setFacultyInfo(data);
                console.log('Fetched Faculty info:', data);

                try {
                    if (data && data.facultyId) {
                        localStorage.setItem('facultyId', data.facultyId.toString());
                        console.log('Faculty ID stored in localStorage:', data.facultyId);
                    } else {
                        console.log('Faculty ID not found in the fetched data');
                    }

                    localStorage.setItem('Faculty', JSON.stringify(data));
                    console.log('Faculty info stored in localStorage');
                } catch (error) {
                    console.error('Error storing Faculty info in localStorage:', error);
                }
            })
            .catch(error => {
                console.error('Error fetching faculty information:', error);
                alert('Failed to fetch faculty information. Please try again later.');
            });
    };

    const fetchData = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.teachersGraders}?id=${profileId}`);
            const json = await response.json();
            setLoading(true);
            console.log('Fetched data:', json);
            setData(Array.isArray(json) ? json : []); // Ensure data is an array
        } catch (error) {
            console.error('Error fetching data: ', error);
            setData([]); // Fallback to empty array on error
        }
    };


    const handleItemPress = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };
    const handleRate = async () => {
        try {
            const facultyIdFromStorage = localStorage.getItem('facultyId');
            if (!facultyIdFromStorage || !selectedItem || !selectedItem.s || !selectedItem.s.student_id) {
                console.error("Missing faculty or student information.");
                return;
            }

            const requestData = {
                facultyId: facultyIdFromStorage,
                studentId: selectedItem.s.student_id,
                rate: rating,
                comment: comment
            };

            const response = await axios.post(
                `http://localhost/Backend/api/Faculty/RateGraderPerformance`,
                null, // No body, params are used
                {
                    params: requestData
                }
            );

            if (response.status === 200) {
                console.log("Rated successfully.");
                message.success("Rated successfully.");
            } else if (response.status === 302) {
                console.log("Already Rated");
                message.error("Already Rated");
            } else if (response.status === 404) {
                console.log("Grader not found");
            } else {
                console.log("Unexpected response from server:", response);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                message.error("Already Rated!");
            } else {
                console.error('An error occurred while rating:', error.message);
                message.error("Error to Rate");
            }
        }
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
                                <Title level={4}>{facultyInfo && (
                                    <>
                                        <div className='image'>
                                            <Avatar
                                                src={facultyInfo?.profilePic ? `${EndPoint.imageUrl}${facultyInfo.profilePic}` : "./logo.png"}
                                                size={64}
                                            />
                                        </div>
                                        <h2>{facultyInfo.name}</h2>
                                    </>
                                )}</Title>
                            </div>
                            <br />
                            <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Login')}>Logout</Button>
                            {/* <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={balanceCheck}>Remaining Balance</Button> */}
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Faculty-Dashboard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='form-box'>
                <h2 style={{ textAlign: 'center' }}>Rate Student</h2>
                <div className="scrollable-list">
                    
                        <List
                            dataSource={data} // Ensure dataSource is an array
                            renderItem={item => (
                                <List.Item onClick={() => handleItemPress(item)} style={{ cursor: 'pointer' }}>
                                    <List.Item.Meta
                                        title={item.s.name}
                                        description={`ARID No: ${item.s.arid_no}, Semester: ${item.s.semester}`}
                                    />
                                </List.Item>
                            )}
                        />
                    
                    </div>

                    <Modal
                        title={`Give Rate & Comment To ${selectedItem?.s.name}`}
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleRate}>
                                Rate
                            </Button>,
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Enter reason"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Rate value={rating} onChange={value => setRating(value)} />
                        </div>
                    </Modal>
                </div>

            </div>
            );
};

            export default FormScreen;
