// import React, { useState } from 'react';
// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const PicturesWall = () => {
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [fileList, setFileList] = useState([]);

//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = (file) => {
//     setPreviewImage(file.thumbUrl || file.url); // Ensure correct URL usage
//     setPreviewVisible(true);
//   };

//   const handleChange = ({ fileList }) => setFileList(fileList);

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div className="ant-upload-text">Upload</div>
//     </div>
//   );

//   return (
//     <div className="clearfix">
//       <Upload
//         action="//jsonplaceholder.typicode.com/posts/"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 3 ? null : uploadButton}
//       </Upload>
//       <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </div>
//   );
// };

// export default PicturesWall;


// Rating Screen

// import React, { useState } from 'react';
// import { Avatar, List, Modal, Button, Rate, Input } from 'antd';
// // import 'antd/dist/antd.css';

// const students = [
//   { avatar: 'https://i.pravatar.cc/150?img=1', name: 'Ahmad', arid: '2020-ARID-1234' },
//   { avatar: 'https://i.pravatar.cc/150?img=2', name: 'Fatima', arid: '2020-ARID-1235' },
//   { avatar: 'https://i.pravatar.cc/150?img=3', name: 'Hassan', arid: '2020-ARID-1236' },
//   { avatar: 'https://i.pravatar.cc/150?img=4', name: 'Ayesha', arid: '2020-ARID-1237' },
//   { avatar: 'https://i.pravatar.cc/150?img=5', name: 'Ali', arid: '2020-ARID-1238' },
//   { avatar: 'https://i.pravatar.cc/150?img=6', name: 'Zainab', arid: '2020-ARID-1239' },
//   { avatar: 'https://i.pravatar.cc/150?img=7', name: 'Omar', arid: '2020-ARID-1240' },
//   { avatar: 'https://i.pravatar.cc/150?img=8', name: 'Maryam', arid: '2020-ARID-1241' },
//   { avatar: 'https://i.pravatar.cc/150?img=9', name: 'Bilal', arid: '2020-ARID-1242' },
//   { avatar: 'https://i.pravatar.cc/150?img=10', name: 'Khadija', arid: '2020-ARID-1243' },
// ];

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [suggestion, setSuggestion] = useState('');
//   const [studentRatings, setStudentRatings] = useState({});

//   const showModal = (student) => {
//     setSelectedStudent(student);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setStudentRatings({
//       ...studentRatings,
//       [selectedStudent.arid]: { rating, suggestion },
//     });
//     setIsModalVisible(false);
//     setRating(0);
//     setSuggestion('');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setRating(0);
//     setSuggestion('');
//   };

//   return (
//     <div className="App">
//       <h1>Student List</h1>
//       <List
//         itemLayout="horizontal"
//         dataSource={students}
//         renderItem={student => (
//           <List.Item
//             actions={[<Button type="primary" onClick={() => showModal(student)}>Rate Student</Button>]}
//           >
//             <List.Item.Meta
//               avatar={<Avatar src={student.avatar} />}
//               title={student.name}
//               description={`ARID: ${student.arid}`}
//             />
//             {studentRatings[student.arid] && (
//               <>
//                 <div>Rating: <Rate disabled value={studentRatings[student.arid].rating} /></div>
//                 <div>Suggestion: {studentRatings[student.arid].suggestion}</div>
//               </>
//             )}
//           </List.Item>
//         )}
//       />
//       <Modal
//         title={`Rate ${selectedStudent?.name}`}
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <div>
//           <h5>Rating:</h5>
//           <Rate onChange={setRating} value={rating} />
//         </div>
//         <div style={{ marginTop: '20px' }}>
//           <h5>Suggestion:</h5>
//           <Input.TextArea
//             value={suggestion}
//             onChange={(e) => setSuggestion(e.target.value)}
//             rows={3}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import { Table, Button, Modal, Progress } from 'antd';
// //import 'antd/dist/reset.css';  // Correctly import Ant Design styles

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState('');

//   const teachers = [
//     {
//       key: '1',
//       name: 'John Doe',
//       status: 'Accepted',
//       reason: 'John has a great track record of improving student performance.'
//     },
//     {
//       key: '2',
//       name: 'Jane Smith',
//       status: 'Rejected',
//       reason: 'Jane lacks the necessary experience in the required subject area.'
//     },
//     {
//       key: '3',
//       name: 'Mary Johnson',
//       status: 'Rejected',
//       reason: 'Mary lacks the necessary teaching certifications.'
//     },
//     {
//       key: '4',
//       name: 'John Doe',
//       status: 'Accepted',
//       reason: 'John has a great track record of improving student performance.'
//     },
//     {
//       key: '5',
//       name: 'John Doe',
//       status: 'Accepted',
//       reason: 'John has a great track record of improving student performance.'
//     },
//     {
//       key: '6',
//       name: 'John Doe',
//       status: 'Accepted',
//       reason: 'John has a great track record of improving student performance.'
//     },
//     // Add more teachers as needed
//   ];

//   const acceptedCount = teachers.filter(teacher => teacher.status === 'Accepted').length;
//   const rejectedCount = teachers.filter(teacher => teacher.status === 'Rejected').length;
//   const totalCount = teachers.length;

//   const acceptedPercentage = totalCount ? ((acceptedCount / totalCount) * 100).toFixed(2) : 0;
//   const rejectedPercentage = totalCount ? ((rejectedCount / totalCount) * 100).toFixed(2) : 0;


//   const showModal = (reason) => {
//     setModalContent(reason);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const columns = [
//     {
//       title: 'Teacher Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <span style={{ color: status === 'Accepted' ? 'green' : 'red' }}>
//           {status}
//         </span>
//       )
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => showModal(record.reason)}>
//           View
//         </Button>
//       )
//     }
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Accepted</h3>
//         <Progress
//           percent={acceptedPercentage}
//           strokeColor="green"
//           trailColor="#d9d9d9"
//         />
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Rejected</h3>
//         <Progress
//           percent={rejectedPercentage}
//           strokeColor="red"
//           trailColor="#d9d9d9"
//         />
//       </div>
//       <Table columns={columns} dataSource={teachers} pagination={false} />
//       <Modal title="Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//         <p>{modalContent}</p>
//       </Modal>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Progress } from 'antd';
// // import 'antd/dist/reset.css';  // Correctly import Ant Design styles

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.example.com/teachers'); // Replace with your API endpoint
//         const data = await response.json();
//         setTeachers(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const acceptedCount = teachers.filter(teacher => teacher.status === 'Accepted').length;
//   const rejectedCount = teachers.filter(teacher => teacher.status === 'Rejected').length;
//   const totalCount = teachers.length;

//   const acceptedPercentage = totalCount ? ((acceptedCount / totalCount) * 100).toFixed(2) : 0;
//   const rejectedPercentage = totalCount ? ((rejectedCount / totalCount) * 100).toFixed(2) : 0;

//   const BarsModal = (reason) => {
//     setModalContent(reason);
//     setIsModalVisible(true);
//   };

//   const BarsOk = () => {
//     setIsModalVisible(false);
//   };

//   const BarsModalCancel = () => {
//     setIsModalVisible(false);
//   };

//   const columns = [
//     {
//       title: 'Teacher Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <span style={{ color: status === 'Accepted' ? 'green' : 'red' }}>
//           {status}
//         </span>
//       )
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => BarsModal(record.reason)}>
//           View
//         </Button>
//       )
//     }
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Accepted</h3>
//         <Progress
//           percent={parseFloat(acceptedPercentage)}
//           strokeColor="green"
//           trailColor="#d9d9d9"
//         />
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Rejected</h3>
//         <Progress
//           percent={parseFloat(rejectedPercentage)}
//           strokeColor="red"
//           trailColor="#d9d9d9"
//         />
//       </div>
//       <Table columns={columns} dataSource={teachers} pagination={false} />
//       <Modal title="Details" visible={isModalVisible} onOk={BarsOk} onCancel={BarsModalCancel}>
//         <p>{modalContent}</p>
//       </Modal>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Rate, Avatar, List } from 'antd';
import EndPoint from '../endpoints';

const FormScreen = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [profileId, setProfileId] = useState(null);

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
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {/* <Avatar
                    size={64}
                    src={facultyInfo?.profilePic ? `${BASE_URL}/FinancialAidAllocation/Content/ProfileImages/${facultyInfo.profilePic}` : "./logo.png"}
                /> */}
                <div style={{ marginLeft: '20px' }}>
                    {facultyInfo && (
                        <>
                            <h2>{facultyInfo.name}</h2>
                            <p>Faculty Member</p>
                        </>
                    )}
                </div>
            </div>

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
    );
};

export default FormScreen;
