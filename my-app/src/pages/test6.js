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







// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Input, Rate, Col, Row, List, Layout, Avatar, Drawer, Typography, message } from 'antd';
// import { LogoutOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
// import { useNavigate } from "react-router-dom";
// import EndPoint from '../endpoints';
// import logo from './BiitLogo.jpeg';
// import axios from 'axios';

// const { Header } = Layout;
// const { Title } = Typography;

// const FormScreen = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [comment, setComment] = useState('');
//     const [rating, setRating] = useState(0);
//     const [facultyInfo, setFacultyInfo] = useState(null);
//     const [profileId, setProfileId] = useState(null);
//     const [isDrawerVisible, setIsDrawerVisible] = useState(false);

//     useEffect(() => {
//         getStoredProfileId();
//     }, []);

//     const getStoredProfileId = async () => {
//         try {
//             const storedProfileId = await localStorage.getItem('profileId');
//             if (storedProfileId !== null) {
//                 setProfileId(storedProfileId);
//                 fetchFacultyInfo(storedProfileId);
//                 fetchData(storedProfileId);
//             }
//         } catch (error) {
//             console.error('Error retrieving profile ID from localStorage:', error);
//         }
//     };

//     const fetchFacultyInfo = async (profileId) => {
//         try {
//             const response = await fetch(`${EndPoint.facultyInfo}?id=${profileId}`);
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
//             }
//             const data = await response.json();
//             setFacultyInfo(data);

//             if (data && data.facultyId) {
//                 localStorage.setItem('facultyId', data.facultyId.toString());
//             }
//             localStorage.setItem('Faculty', JSON.stringify(data));
//         } catch (error) {
//             console.error('Error fetching faculty information:', error);
//             message.error('Failed to fetch faculty information. Please try again later.');
//         }
//     };

//     const fetchData = async (profileId) => {
//         try {
//             const response = await fetch(`${EndPoint.teachersGraders}?id=${profileId}`);
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
//             }
//             const json = await response.json();
//             setData(json);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             message.error('Failed to fetch data. Please try again later.');
//         }
//     };

//     const logout = () => {
//         Modal.confirm({
//             title: 'Logout',
//             content: 'Are you sure you want to logout?',
//             okText: 'Yes',
//             cancelText: 'No',
//             onOk: () => {
//                 localStorage.clear();
//                 navigate('/Login');
//             },
//         });
//     };

//     const showDrawer = () => {
//         setIsDrawerVisible(true);
//     };

//     const onClose = () => {
//         setIsDrawerVisible(false);
//     };

//     const handleItemPress = (item) => {
//         setSelectedItem(item);
//         setIsModalVisible(true);
//     };

//     const navigateTo = (path) => {
//         navigate(path);
//     };

//     const rateGraderPerformance = async (facultyId, graderId, rate, comment) => {
//         try {
//             console.log('Sending data:', {
//                 facultyId,
//                 graderId,
//                 rate,
//                 comment
//             });
    
//             const response = await axios.post(`${EndPoint.rateGraderPerformance}`, {
//                 facultyId: facultyId,
//                 graderId: graderId,
//                 rate: rate,
//                 comment: comment
//             });
    
//             if (response.status === 200) {
//                 message.success('Rating submitted successfully!');
//             } else {
//                 throw new Error(`Unexpected status code: ${response.status}`);
//             }
//         } catch (error) {
//             console.error("Error Occurred:", error.message);
//             message.error(`Error occurred while rating: ${error.message}`);
//         }
//     };
    
//     return (
//         <div className='container'>
//             <Header className="navbar">
//                 <Row justify="space-between" align="middle">
//                     <Col>
//                         <Button icon={<BarsOutlined />} onClick={showDrawer} />
//                         <Drawer
//                             placement="left"
//                             width={300}
//                             closable={true}
//                             onClose={onClose}
//                             visible={isDrawerVisible}
//                         >
//                             <div className="sider-content">
//                                 <Title level={4}>{facultyInfo && (
//                                     <>
//                                         <Avatar
//                                             src={facultyInfo?.profilePic ? `${EndPoint.imageUrl}${facultyInfo.profilePic}` : "./logo.png"}
//                                             size={64}
//                                         />
//                                         <h2>{facultyInfo.name}</h2>
//                                     </>
//                                 )}</Title>
//                             </div>
//                             <br />
//                             <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={() => navigateTo('/Committee-Dashboard')}>Switch to Committee</Button>
//                             <Button type="primary" style={{ width: '80%', marginTop: '10px' }} onClick={logout} icon={<LogoutOutlined />}>Logout</Button>
//                         </Drawer>
//                     </Col>
//                     <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
//                         BIIT Faculty Dashboard
//                     </Col>
//                     <Col>
//                         <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
//                     </Col>
//                 </Row>
//             </Header>

//             <div className="form-box">
//                 <h2 style={{ textAlign: 'center' }}>Rate Students</h2>
//                 <div className="scrollable-list">
//                     <List
//                         dataSource={data}
//                         renderItem={item => (
//                             <List.Item onClick={() => handleItemPress(item)}>
//                                 <List.Item.Meta
//                                     avatar={<Avatar size={64} icon={<UserOutlined />} />}
//                                     title={item.s.name}
//                                     description={`Arid No: ${item.s.arid_no} | Semester: ${item.s.semester}`}
//                                 />
//                             </List.Item>
//                         )}
//                     />
//                 </div>
//                 <Modal
//                     title={`Give Rate & Comment To ${selectedItem?.s.name}`}
//                     visible={isModalVisible}
//                     onCancel={() => setIsModalVisible(false)}
//                     onOk={() => {
//                         if (selectedItem) {
//                             const student_id = selectedItem.s.student_id; // Ensure this is correctly referenced
//                             if (!student_id) {
//                                 message.error('Student ID is missing.');
//                                 console.log(student_id);
//                                 return;
//                             }
//                             rateGraderPerformance(profileId, student_id, rating, comment);
//                             setIsModalVisible(false);
//                         }
//                     }}
//                 >
//                     <Input
//                         placeholder="Enter reason"
//                         value={comment}
//                         onChange={e => setComment(e.target.value)}
//                         style={{ marginBottom: '10px' }}
//                     />
//                     <Rate onChange={setRating} value={rating} />
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default FormScreen;















// import React, { useEffect, useState } from 'react';
// import { PieChart } from 'react-chartjs-2'; 
// import Modal from 'react-modal'; 
// import axios from 'axios';
// import './ViewApplication.css'; 
// import EndPoint from '../endpoints';

// const ViewApplication = () => {
//     const [applicationData, setApplicationData] = useState(null);
//     const [isDataModalVisible, setIsDataModalVisible] = useState(false);
//     const [isImageModalVisible, setIsImageModalVisible] = useState(false);
//     const [selectedImageUri, setSelectedImageUri] = useState('');
//     const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
//     const [selectedPdfUri, setSelectedPdfUri] = useState('');
//     const [amount, setAmount] = useState('');
//     const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false); // Define accept modal state

//     useEffect(() => {
//         const fetchApplicationData = async () => {
//             try {
//                 const data = await localStorage.getItem('selectedApplication');
//                 if (data) {
//                     const parsedData = JSON.parse(data);
//                     const sortedDocuments = parsedData.EvidenceDocuments.sort((a, b) => {
//                         if (a.document_type === 'salaryslip') return -1;
//                         if (b.document_type === 'salaryslip') return 1;
//                         return 0;
//                     });
//                     parsedData.EvidenceDocuments = sortedDocuments;
//                     setApplicationData(parsedData);
//                 } else {
//                     console.log('No application data found in localStorage');
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch application data from localStorage', error);
//             }
//         };
//         fetchApplicationData();
//     }, []);

//     const handleImagePress = (uri) => {
//         setSelectedImageUri(uri);
//         setIsImageModalVisible(true);
//     };

//     const handlePdfPress = (uri) => {
//         setSelectedPdfUri(uri);
//         setIsPdfModalVisible(true);
//     };

//     const handleReject = async () => {
//         const applicationId = applicationData?.applicationID;
//         if (!applicationId) {
//             alert('Application ID is missing');
//             return;
//         }
//         try {
//             const response = await axios.post(`${EndPoint.rejectApplication}`, {
//                 applicationid: applicationId,
//                 status: 'Rejected',
//             });
//             alert('Application rejected successfully!');
//         } catch (error) {
//             console.error('Failed to reject application', error);
//             alert('Failed to reject application');
//         }
//     };

//     const handleSaveAmount = async () => {
//         const applicationId = applicationData?.applicationID;
//         if (!applicationId) {
//             alert('Application ID is missing');
//             return;
//         }
//         try {
//             const response = await axios.post(`${EndPoint.acceptApplication}`, {
//                 amount,
//                 applicationid: applicationId,
//             });
//             alert('Application accepted successfully!');
//         } catch (error) {
//             console.error('Failed to accept application', error);
//             alert('Failed to accept application');
//         }
//     };

//     const getStatusCounts = () => {
//         if (!applicationData || !applicationData.Suggestions) {
//             return { accept: 0, reject: 0 };
//         }
//         const acceptCount = applicationData.Suggestions.filter(item => item.status === 'Accept').length;
//         const rejectCount = applicationData.Suggestions.filter(item => item.status === 'Reject').length;
//         return { accept: acceptCount, reject: rejectCount };
//     };

//     const { accept, reject } = getStatusCounts();
//     const total = accept + reject;
//     const acceptPercent = total > 0 ? (accept / total) * 100 : 0;
//     const rejectPercent = total > 0 ? (reject / total) * 100 : 0;

//     const pieData = {
//         labels: ['Accept', 'Reject'],
//         datasets: [{
//             data: [accept, reject],
//             backgroundColor: ['green', 'red'],
//         }],
//     };

//     return (
//         <div className="container">
//             <h1>Application Status Summary</h1>
//             <PieChart data={pieData} />
//             <p>Accept: {accept} ({acceptPercent.toFixed(2)}%)</p>
//             <p>Reject: {reject} ({rejectPercent.toFixed(2)}%)</p>
//             <button onClick={() => setIsDataModalVisible(true)}>Show Details</button>

//             <ul>
//                 {applicationData?.Suggestions.map((item) => (
//                     <li key={item.$id}>
//                         {item.CommitteeMemberName} - {item.status}
//                         <button onClick={() => handleImagePress(item.image)}>View Image</button>
//                         <button onClick={() => handlePdfPress(item.image)}>View PDF</button>
//                     </li>
//                 ))}
//             </ul>

//             <button onClick={handleReject}>Reject</button>
//             <button onClick={() => setIsAcceptModalVisible(true)}>Accept</button>

//             <Modal isOpen={isDataModalVisible} onRequestClose={() => setIsDataModalVisible(false)}>
//                 <h2>Application Details</h2>
//                 <button onClick={() => setIsDataModalVisible(false)}>Close</button>
//                 <div>
//                     {applicationData?.EvidenceDocuments.map((doc) => (
//                         <div key={doc.id}>
//                             <img src={`${EndPoint.deathCertificate}`} alt="Document" onClick={() => handleImagePress(doc.image)} />
//                         </div>
//                     ))}
//                     <p>Name: {applicationData?.name}</p>
//                     <p>Arid No: {applicationData?.arid_no}</p>
//                     <p>Father Name: {applicationData?.father_name}</p>
//                     <p>Father Status: {applicationData?.father_status}</p>
//                     <p>Amount Required: {applicationData?.requiredAmount}</p>
//                     <p>Salary: {applicationData?.salary}</p>
//                 </div>
//             </Modal>

//             <Modal isOpen={isImageModalVisible} onRequestClose={() => setIsImageModalVisible(false)}>
//                 <img src={selectedImageUri} alt="Full Size" />
//                 <button onClick={() => setIsImageModalVisible(false)}>Close</button>
//             </Modal>

//             <Modal isOpen={isPdfModalVisible} onRequestClose={() => setIsPdfModalVisible(false)}>
//                 <iframe src={selectedPdfUri} title="PDF Document" />
//                 <button onClick={() => setIsPdfModalVisible(false)}>Close</button>
//             </Modal>

//             <Modal isOpen={isAcceptModalVisible} onRequestClose={() => setIsAcceptModalVisible(false)}>
//                 <h2>Enter Amount</h2>
//                 <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//                 <button onClick={handleSaveAmount}>Save</button>
//                 <button onClick={() => setIsAcceptModalVisible(false)}>Close</button>
//             </Modal>
//         </div>
//     );
// };

// export default ViewApplication;

zz