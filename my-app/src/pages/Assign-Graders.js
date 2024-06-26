import React, { useState, useEffect } from 'react';
import '../Styling/Assign-Graders.css';
import { Button, List, Col, Row, Layout, Avatar, message, Modal, Spin } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from './BiitLogo.jpeg';
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

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoadingStudents(true);
                // Simulating loading delay of 3-5 seconds
                setTimeout(async () => {
                    const response = await axios.get(EndPoint.getAllStudents);
                    setStudentsData(response.data);
                }, Math.floor(Math.random() * 3000) + 3000); // Random delay between 3 to 5 seconds
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
                // Simulating loading delay of 3-5 seconds
                setTimeout(async () => {
                    const response = await axios.get(EndPoint.getFacultyMembers);
                    if (!response.data || !Array.isArray(response.data)) {
                        throw new Error('Invalid data received');
                    }
                    setFacultyData(response.data);
                }, Math.floor(Math.random() * 3000) + 3000); // Random delay between 3 to 5 seconds
            } catch (error) {
                console.error('Error fetching Faculty Members:', error);
                message.error('Failed to load Faculty Members.');
            } finally {
                setLoadingFaculty(false);
            }
        };

        fetchFacultyMembers();
    }, []);

    const assignTeacher = async (facultyId) => {
        try {
            if (!selectedStudent) {
                message.error('No student selected');
                return;
            }
            setAssigningTeacher(true);
            const response = await axios.post(EndPoint.assignGrader, {
                facultyId: facultyId,
                studentId: selectedStudent.studentId
            });
            if (response.status === 200) {
                message.success('Teacher assigned successfully');
            } else {
                message.error('Failed to assign teacher');
            }
        } catch (error) {
            console.error('Error assigning teacher:', error);
            message.error('Failed to assign teacher');
        } finally {
            setAssigningTeacher(false);
            setModalVisible(false);
        }
    };

    const Back = () => {
        navigate('/Admin-Dashboard');
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Student List
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
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
                                        title={item.name}
                                        description={item.arid_no}
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
                                    <Button key="assign" type="primary" onClick={() => assignTeacher(item.facultyId)} loading={assigningTeacher}>
                                        Assign
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </Modal>
        </div>
    );
};

export default GradersList;
