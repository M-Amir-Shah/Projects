import React, { useState, useEffect } from 'react';
import { Button, List, Col, Row, Layout, Avatar, message, Modal, Spin, Rate, Input } from 'antd'; // Importing necessary components from antd
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from './BiitLogo.jpeg';

const { Header } = Layout;
const { TextArea } = Input;

const FacultyDashboard = () => {
    const navigate = useNavigate();
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [ratingDescription, setRatingDescription] = useState('');
    const [comments, setComments] = useState('');
    const [studentComments, setStudentComments] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            // Simulate fetching students data
            setLoadingStudents(true);
            setTimeout(() => {
                const fakeStudentsData = [
                    { name: 'John Doe', arid_no: '2020-Arid-3690', AverageRating: 4, comments: 'Good performance in assignments.' },
                    { name: 'Jane Smith', arid_no: '2023-Arid-3216', AverageRating: 2, comments: 'Needs improvement in attendance.' },
                    { name: 'John Doe', arid_no: '2020-Arid-3690', AverageRating: 3, comments: 'Consistent effort in coursework.' },
                ];
                setStudentsData(fakeStudentsData);
                setLoadingStudents(false);
            }, 1000);
        };
        fetchStudents();
    }, []);

    const rateStudent = () => {
        // Simulate rating student
        setTimeout(() => {
            message.success('Student rated successfully');
            setStudentsData(prevData => 
                prevData.map(student => 
                    student.arid_no === selectedStudent.arid_no ? { ...student, AverageRating: currentRating, comments } : student
                )
            );
            setModalVisible(false);
        }, 1000);
    };

    const handleRatingChange = (value) => {
        setCurrentRating(value);
        switch (value) {
            case 1:
                setRatingDescription('Poor');
                break;
            case 2:
                setRatingDescription('Unsatisfied');
                break;
            case 3:
                setRatingDescription('Average');
                break;
            case 4:
                setRatingDescription('Good');
                break;
            case 5:
                setRatingDescription('Excellent');
                break;
            default:
                setRatingDescription('');
        }
    };

    const openModal = (student) => {
        setSelectedStudent(student);
        setCurrentRating(student.AverageRating);
        setComments(student.comments || '');  // Populate comments if available
        handleRatingChange(student.AverageRating);
        setModalVisible(true);
    };

    const Back = () => {
        navigate('/Login');
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Rating Screen
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Rate Students</h2>
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
                                            <>
                                                <div>Average Rating: {item.AverageRating}</div>
                                                {item.comments && <div>Comments: {item.comments}</div>}
                                            </>
                                        }
                                    />
                                    <Button onClick={() => openModal(item)}>
                                        Rate
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </div>

            <Modal
                title="Rate Student"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="rate" type="primary" onClick={rateStudent}>
                        Rate
                    </Button>,
                ]}
            >
                {selectedStudent && (
                    <div style={{ textAlign: 'center' }}>
                        <h3>{selectedStudent.name} ({selectedStudent.arid_no})</h3>
                        <Rate value={currentRating} onChange={handleRatingChange} />
                        <div>{ratingDescription}</div>
                        <TextArea 
                            rows={4} 
                            value={comments} 
                            onChange={(e) => setComments(e.target.value)} 
                            placeholder="Comments about the student"
                            style={{ marginTop: '16px' }}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FacultyDashboard;
