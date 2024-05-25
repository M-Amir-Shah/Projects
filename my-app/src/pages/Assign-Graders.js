import React, { useState, useEffect } from 'react';
import '../Styling/Assign-Graders.css';
import { Button, List, Col, Row, Layout, Avatar, message, Modal } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from './BiitLogo.jpeg';
import EndPoint from '../endpoints'; // Import your API endpoints file
const { Header } = Layout;

const GradersList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility
    const [selectedTeacher, setSelectedTeacher] = useState(null); // State variable to store selected teacher
    const [studentsData, setStudentsData] = useState([]); // State variable to store students data
    const [facultyData, setFacultyData] = useState([]); // State variable to store faculty data

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true); // Set loading state to true while fetching data
                const response = await fetch(EndPoint.getAllStudents); // Fetch data from API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch students data');
                }
                const data = await response.json(); // Parse JSON response
                setStudentsData(data); // Set fetched data to state
            } catch (error) {
                console.error('Error fetching students:', error);
                message.error('Failed to fetch students data.');
            } finally {
                setLoading(false); // Set loading state back to false after fetching data
            }
        };

        fetchStudents(); // Call the fetchStudents function when component mounts
    }, []);

    // Function to handle assigning a teacher
    const assignTeacher = async (teacher) => {
        try {
            const response = await fetch(EndPoint.getFacultyMembers);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Faculty Members:', error);
            message.error('Failed to load Faculty Members.');
            return [];
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
                        BIIT Graders List
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Graders</h2>
                <div className="scrollable-list">
                    <List
                        itemLayout="horizontal"
                        dataSource={studentsData}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                    title={item.name}
                                />
                                <Button onClick={() => { setSelectedTeacher(item); setModalVisible(true); }}>
                                    Assign
                                </Button>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            {/* Modal for assigning teacher */}
            <Modal
                title="Assign Teacher"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                {/* List of teachers in the modal */}
                <List
                    itemLayout="horizontal"
                    dataSource={facultyData} // Use facultyData instead of teachersData
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                title={item.name}
                            />
                            <Button type="primary" onClick={() => assignTeacher(item)} loading={loading}>
                                Assign
                            </Button>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default GradersList;
