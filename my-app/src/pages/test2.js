// import React, { useState } from 'react';
// import { List, Button, Modal, Rate, Input } from 'antd';

// const students = [
//   { name: 'John Doe', arid: 'ARID123' },
//   { name: 'Jane Smith', arid: 'ARID124' },
//   // Add more students here
// ];

// const StudentList = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [suggestions, setSuggestions] = useState('');
//   const [ratedStudents, setRatedStudents] = useState([]);

//   const showModal = (student) => {
//     setSelectedStudent(student);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     const newRatedStudents = [...ratedStudents, { ...selectedStudent, rating, suggestions }];
//     setRatedStudents(newRatedStudents);
//     setIsModalVisible(false);
//     setRating(0);
//     setSuggestions('');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div>
//       <List
//         bordered
//         dataSource={students}
//         renderItem={student => (
//           <List.Item>
//             <Button type="link" onClick={() => showModal(student)}>
//               {student.name}
//             </Button>
//           </List.Item>
//         )}
//       />
//       <Modal
//         title="Rate Student"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         {selectedStudent && (
//           <div>
//             <p>Name: {selectedStudent.name}</p>
//             <p>ARID: {selectedStudent.arid}</p>
//             <Rate onChange={value => setRating(value)} value={rating} />
//             <Input.TextArea
//               rows={4}
//               placeholder="Suggestions"
//               onChange={e => setSuggestions(e.target.value)}
//               value={suggestions}
//             />
//           </div>
//         )}
//       </Modal>
//       <h2>Rated Students</h2>
//       <List
//         bordered
//         dataSource={ratedStudents}
//         renderItem={student => (
//           <List.Item>
//             {student.name} (ARID: {student.arid}) - Rated: {student.rating} Stars
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default StudentList;


