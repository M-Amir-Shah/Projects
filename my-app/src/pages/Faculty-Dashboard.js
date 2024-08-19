// import React, { useState, useEffect } from 'react';
// import { Button, List, Col, Row, Layout, Avatar, message, Modal, Spin, Rate, Input } from 'antd'; // Importing necessary components from antd
// import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import logo from './BiitLogo.jpeg';

// const { Header } = Layout;
// const { TextArea } = Input;

// const FacultyDashboard = () => {
//     const navigate = useNavigate();
//     const [loadingStudents, setLoadingStudents] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedStudent, setSelectedStudent] = useState(null);
//     const [studentsData, setStudentsData] = useState([]);
//     const [currentRating, setCurrentRating] = useState(0);
//     const [ratingDescription, setRatingDescription] = useState('');
//     const [comments, setComments] = useState('');
//     const [studentComments, setStudentComments] = useState({});

//     useEffect(() => {
//         const fetchStudents = async () => {
//             // Simulate fetching students data
//             setLoadingStudents(true);
//             setTimeout(() => {
//                 const fakeStudentsData = [
//                     { name: 'John Doe', arid_no: '2020-Arid-3690', AverageRating: 4, comments: 'Good performance in assignments.' },
//                     { name: 'Jane Smith', arid_no: '2023-Arid-3216', AverageRating: 2, comments: 'Needs improvement in attendance.' },
//                     { name: 'John Doe', arid_no: '2020-Arid-3690', AverageRating: 3, comments: 'Consistent effort in coursework.' },
//                 ];
//                 setStudentsData(fakeStudentsData);
//                 setLoadingStudents(false);
//             }, 1000);
//         };
//         fetchStudents();
//     }, []);

//     const rateStudent = () => {
//         // Simulate rating student
//         setTimeout(() => {
//             message.success('Student rated successfully');
//             setStudentsData(prevData => 
//                 prevData.map(student => 
//                     student.arid_no === selectedStudent.arid_no ? { ...student, AverageRating: currentRating, comments } : student
//                 )
//             );
//             setModalVisible(false);
//         }, 1000);
//     };

//     const handleRatingChange = (value) => {
//         setCurrentRating(value);
//         switch (value) {
//             case 1:
//                 setRatingDescription('Poor');
//                 break;
//             case 2:
//                 setRatingDescription('Unsatisfied');
//                 break;
//             case 3:
//                 setRatingDescription('Average');
//                 break;
//             case 4:
//                 setRatingDescription('Good');
//                 break;
//             case 5:
//                 setRatingDescription('Excellent');
//                 break;
//             default:
//                 setRatingDescription('');
//         }
//     };

//     const openModal = (student) => {
//         setSelectedStudent(student);
//         setCurrentRating(student.AverageRating);
//         setComments(student.comments || '');  // Populate comments if available
//         handleRatingChange(student.AverageRating);
//         setModalVisible(true);
//     };

//     const Back = () => {
//         navigate('/Login');
//     };

//     return (
//         <div className="container">
//             <Header className="navbar">
//                 <Row justify="space-between" align="middle">
//                     <Col>
//                         <Button onClick={Back} icon={<ArrowLeftOutlined />} />
//                     </Col>
//                     <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
//                         BIIT Rating Screen
//                     </Col>
//                     <Col>
//                         <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
//                     </Col>
//                 </Row>
//             </Header>
//             <div className="form-box">
//                 <h2 style={{ textAlign: 'center' }}>Rate Students</h2>
//                 <div className="scrollable-list">
//                     <Spin spinning={loadingStudents}>
//                         <List
//                             itemLayout="horizontal"
//                             dataSource={studentsData}
//                             renderItem={item => (
//                                 <List.Item>
//                                     <List.Item.Meta
//                                         avatar={<Avatar size={64} icon={<UserOutlined />} />}
//                                         title={`${item.name} (${item.arid_no})`}
//                                         description={
//                                             <>
//                                                 <div>Average Rating: {item.AverageRating}</div>
//                                                 {item.comments && <div>Comments: {item.comments}</div>}
//                                             </>
//                                         }
//                                     />
//                                     <Button onClick={() => openModal(item)}>
//                                         Rate
//                                     </Button>
//                                 </List.Item>
//                             )}
//                         />
//                     </Spin>
//                 </div>
//             </div>

//             <Modal
//                 title="Rate Student"
//                 visible={modalVisible}
//                 onCancel={() => setModalVisible(false)}
//                 footer={[
//                     <Button key="cancel" onClick={() => setModalVisible(false)}>
//                         Cancel
//                     </Button>,
//                     <Button key="rate" type="primary" onClick={rateStudent}>
//                         Rate
//                     </Button>,
//                 ]}
//             >
//                 {selectedStudent && (
//                     <div style={{ textAlign: 'center' }}>
//                         <h3>{selectedStudent.name} ({selectedStudent.arid_no})</h3>
//                         <Rate value={currentRating} onChange={handleRatingChange} />
//                         <div>{ratingDescription}</div>
//                         <TextArea 
//                             rows={4} 
//                             value={comments} 
//                             onChange={(e) => setComments(e.target.value)} 
//                             placeholder="Comments about the student"
//                             style={{ marginTop: '16px' }}
//                         />
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default FacultyDashboard;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Rate, Col, Row, List, Layout, Drawer, Typography } from 'antd';
import { LogoutOutlined, BarsOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints';
import logo from './BiitLogo.jpeg';

const { Header } = Layout;
const { Title } = Typography;

const FormScreen = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [profileId, setProfileId] = useState(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        getStoredProfileId();
    }, []);

    const getStoredProfileId = async () => {
        try {
            const storedProfileId = localStorage.getItem('profileId');
            if (storedProfileId !== null) {
                setProfileId(storedProfileId);
                fetchFacultyInfo(storedProfileId);
                fetchData(storedProfileId);
            } else {
                console.log('Profile ID not found in localStorage');
            }
        } catch (error) {
            console.error('Error retrieving profile ID from localStorage:', error);
        }
    };

    const fetchFacultyInfo = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.facultyInfo}?id=${profileId}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setFacultyInfo(data);

            if (data && data.facultyId) {
                localStorage.setItem('facultyId', data.facultyId.toString());
            }
            localStorage.setItem('Faculty', JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching faculty information:', error);
            alert('Failed to fetch faculty information. Please try again later.');
        }
    };

    const fetchData = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.teachersGraders}?id=${profileId}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const logout = () => {
        Modal.confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                localStorage.clear();
                navigate('/Login');
            },
        });
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleRate = async () => {
        try {
            const studentId = selectedItem?.s.student_id;
            if (!studentId) {
                console.error('Error: Student ID not found');
                return;
            }

            const url = `${EndPoint.rateGraderPerformance}?facultyId=${profileId}&studentId=${studentId}&rate=${rating}&comment=${comment}`;
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });

            if (response.ok) {
                alert('Rate submitted successfully');
            } else {
                const errorMessage = await response.text();
                alert('Error message:', errorMessage);
            }

            setComment('');
            setRating(0);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error submitting rate:', error);
        }
    };

    return (
        <div className='container'>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<BarsOutlined />} onClick={showDrawer} />
                        <Drawer
                            placement="left"
                            width={300}
                            closable={true}
                            onClose={onClose}
                            visible={isDrawerVisible}
                        >
                            <div className="sider-content">
                                <Title level={4}>{facultyInfo && (
                                    <>
                                        <h2>{facultyInfo.name}</h2>
                                    </>
                                )}</Title>

                            </div>
                            <br />
                            <Button type="primary" onClick={logout} icon={<LogoutOutlined />} style={{ width: '80%' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Faculty Dashboard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>

            <div className="form-box">
            <h2 style={{ textAlign: 'center' }}>Rate Students</h2>
                <div className="scrollable-list">
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item onClick={() => handleItemPress(item)}>
                            <List.Item.Meta
                                title={item.s.name}
                                description={`Arid No: ${item.s.arid_no} | Semester: ${item.s.semester}`}
                            />
                        </List.Item>
                    )}
                />

                </div>
                <Modal
                    title={`Give Rate & Comment To ${selectedItem?.s.name}`}
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onOk={handleRate}
                >
                    <Input
                        placeholder="Enter reason"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Rate onChange={setRating} value={rating} />
                </Modal>
            </div>
        </div>
    );
};

export default FormScreen;
