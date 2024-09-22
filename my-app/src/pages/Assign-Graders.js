import React, { useState, useEffect } from 'react';
import '../Styling/Assign-Graders.css';
import { Button, List, Col, Row, Layout, Avatar, message, Modal, Spin, Input } from 'antd';
import { ArrowLeftOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EndPoint from '../endpoints'; // Import your API endpoints file

const { Header } = Layout;

const GradersList = (props) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [assignGrader, setAssignGrader] = useState([]);
    const [filteredAssignGrader, setFilteredAssignGrader] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [assignedGraders, setAssignedGraders] = useState({});
    const [modalSearchQuery, setModalSearchQuery] = useState('');
    const [filteredModalData, setFilteredModalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showListModal, setShowListModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filteredData = modalData.filter(item =>
            item.name.toLowerCase().includes(modalSearchQuery.toLowerCase())
        );
        setFilteredModalData(filteredData);
    }, [modalSearchQuery, modalData]);

    const handleModalSearchChange = (text) => {
        setModalSearchQuery(text);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${EndPoint.unAssignedStudents}`);
            console.log('Fetch Unassigned Students OK:', response.data);
            setAssignGrader(response.data);
            setFilteredAssignGrader(response.data);
        } catch (error) {
            console.error('Error fetching graders:', error);
            message.error('Failed to fetch unassigned students.');
        } finally {
            setLoading(false);
        }
    };

    const fetchModalData = async () => {
        setModalLoading(true);
        try {
            const response = await axios.get(`${EndPoint.getFacultyMembers}`);
            console.log('Fetch Faculty Members OK:', response.data);
            setModalData(response.data);
        } catch (error) {
            console.error('Error fetching modal data:', error);
            message.error('Failed to fetch faculty members.');
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        if (isModalVisible) {
            fetchModalData();
        }
    }, [isModalVisible]);

    const handleAssignButtonPress = (faculty) => {
        if (faculty.assigned || assignedGraders[faculty.student_id]) return;
        localStorage.setItem('selectedStudentId', faculty.student_id);
        fetchModalData();
        setIsModalVisible(true);
    };

    const handleAssignGrader = async (item) => {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId) {
            console.error('Student ID not found in localStorage');
            message.error('Please select a student first.');
            return;
        }

        Modal.confirm({
            title: `Do you want to assign a grader to ${item.name}?`,
            onOk: async () => {
                try {
                    const url = `${EndPoint.assignGrader}?facultyId=${item.facultyId}&studentId=${studentId}`;
                    const response = await axios.post(url);
                    console.log('Assign Grader Request OK:', response.data);

                    if (response.status === 200) {
                        console.log('Grader assigned successfully');
                        message.success('Grader assigned successfully');
                        setAssignedGraders(prevState => ({ ...prevState, [studentId]: true }));
                        setIsModalVisible(false);
                    } else if (response.status === 302) { // 302 is Found status code in axios
                        console.warn('Student is already assigned a grader');
                        message.success('Student is Already Assigned');
                    } else {
                        console.error('Failed to assign grader:', response.data);
                        message.error('Failed to assign grader.');
                    }
                } catch (error) {
                    console.error('Error assigning grader:', error);
                    message.error('An error occurred while assigning grader.',error.data);
                }
            },
        });
    };

    const handleTouchFlatlist = (item) => {
        Modal.confirm({
            title: "Choose Action",
            content: "Do you want to assign grader?",
            okText: "Continue",
            cancelText: "Reject",
            onOk: () => {
                console.log('Continue action selected for', item);
                props.navigation.navigate('');
            },
            onCancel: () => {
                console.log('Reject action selected, navigating to AssignGrader');
                props.navigation.navigate('AssignGrader');
            },
        });
    };

    useEffect(() => {
        const filteredData = assignGrader.filter(item =>
            item && item.arid_no && item.arid_no.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAssignGrader(filteredData);
    }, [searchQuery, assignGrader]);

    const Back = () => {
        navigate('/Admin-Dashboard');
    };

    const fetchedData = async () => {
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
        fetchedData(); // Initial fetch
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
                    {loading ? (
                        <Spin />
                    ) : (
                        <List
                            dataSource={filteredAssignGrader}
                            renderItem={item => (
                                <List.Item
                                    style={{
                                        backgroundColor: item.AverageRating < 4 ? '#fcbdbd' : 'inherit', // Light red background if rating < 4
                                    }}
                                    actions={[
                                        <Button
                                            type="primary"
                                            disabled={item.assigned || assignedGraders[item.student_id]}
                                            onClick={() => handleAssignButtonPress(item)}
                                        >
                                            {item.assigned || assignedGraders[item.student_id] ? 'Assigned' : 'Assign'}
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={item.profilePic ? `${EndPoint.imageUrl}${item.profilePic}` : './logo.png'}
                                            />
                                        }
                                        title={<a onClick={() => handleTouchFlatlist(item)}>{item.name} ({item.arid_no})</a>}
                                        description={`Previous Rating : ${item.AverageRating}`}
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </div>

            <Modal
                title="Assign Grader"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Input
                    placeholder="Search by name"
                    value={modalSearchQuery}
                    onChange={(e) => handleModalSearchChange(e.target.value)}
                    style={{ marginBottom: 20 }}
                />
                {modalLoading ? (
                    <Spin />
                ) : (
                    <List
                        dataSource={filteredModalData}
                        renderItem={item => (
                            <List.Item onClick={() => handleAssignGrader(item)}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profilePic ? `${EndPoint.imageUrl}${item.profilePic}` : './logo.png'} />}
                                    title={item.name}
                                />
                            </List.Item>
                        )}
                    />
                )}
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

export default GradersList;
