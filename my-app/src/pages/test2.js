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
