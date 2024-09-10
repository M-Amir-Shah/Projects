import React, { useState, useEffect } from 'react';
import '../Styling/Assign-Graders.css';
import { Button, List, Col, Row, Layout, Avatar, message, Modal, Spin } from 'antd';
import { ArrowLeftOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EndPoint from '../endpoints'; // Import your API endpoints file

const { Header } = Layout;

const GradersList = () => {
    const navigate = useNavigate();
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [loadingFaculty, setLoadingFaculty] = useState(false);
    const [assigningTeacher, setAssigningTeacher] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);
    const [data, setData] = useState([]);
    const [showListModal, setShowListModal] = useState(false); // State for controlling the modal

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoadingStudents(true);
                const response = await axios.get(EndPoint.unAssignedStudents);
                setStudentsData(response.data);
                console.log("Unassigned Students ", response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                message.error('Failed to fetch students data.');
            } finally {
                setLoadingStudents(false);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchFacultyMembers = async () => {
            try {
                setLoadingFaculty(true);
                const response = await axios.get(EndPoint.getFacultyMembers);
                setFacultyData(response.data);
                console.log("Faculty Members", response.data);
            } catch (error) {
                console.error('Error fetching Faculty Members:', error);
                message.error('Failed to load Faculty Members.');
            } finally {
                setLoadingFaculty(false);
            }
        };
        fetchFacultyMembers();
    }, []);

    const assignGrader = async (facultyId, studentId) => {
        if (!facultyId || !studentId) {
            message.error('Invalid data.');
            return;
        }

        try {
            setAssigningTeacher(true);
            const response = await fetch('http://localhost/Backend/api/Admin/AssignGrader', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ facultyId, studentId }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Success:', result);
                message.success('Grader assigned successfully.');
                setModalVisible(false); // Close modal on success
                // Optionally refresh student data or perform other actions
            } else {
                console.log('Error:', result);
                message.error(`Error: ${result.Message}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            message.error('Network error occurred.');
        } finally {
            setAssigningTeacher(false); // Hide loading state
        }
    };

    const Back = () => {
        navigate('/Admin-Dashboard');
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

    const handleBellClick = () => {
        setShowListModal(true);
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Graders List
                    </Col>
                    <Col>
                        <Button onClick={handleBellClick} icon={<BellOutlined />} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Assigning Grader</h2>
                <div className="scrollable-list">
                    <Spin spinning={loadingStudents}>
                        <List
                            itemLayout="horizontal"
                            dataSource={studentsData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                        title={`${item.name} (${item.arid_no})`}
                                        description={
                                            <div
                                                style={{
                                                    background: item.AverageRating <= 3 ? '#ff9999' : 'inherit',
                                                }}
                                            >
                                                <span style={{ fontWeight: 'bold' }}>Previous Rating: </span>
                                                {item.AverageRating}
                                            </div>
                                        }
                                    />
                                    <Button onClick={() => { setSelectedStudent(item); setModalVisible(true); }}>
                                        Assign
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </div>

            <Modal
                title="Assign Faculty Member"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Spin spinning={loadingFaculty}>
                        <List
                            itemLayout="horizontal"
                            dataSource={facultyData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                        title={item.name}
                                    />
                                    <Button
                                        key="assign"
                                        type="primary"
                                        onClick={() => {
                                            if (selectedStudent) {
                                                assignGrader(item.facultyId, selectedStudent.studentId); // Pass both IDs
                                            }
                                        }}
                                        loading={assigningTeacher}
                                    >
                                        Assign
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </Modal>

            {/* Modal to show the list */}
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

export default GradersList;
