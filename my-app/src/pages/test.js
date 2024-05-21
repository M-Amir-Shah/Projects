// import React from 'react';
// import { List, Avatar } from 'antd';

// // Replace with your actual data
// const dataList = [
//   {
//     title: 'Dr Zeeshan',
//     avatar: 'URL_TO_DR_ZEESHAN_AVATAR', // Replace with actual avatar URL
//   },
//   {
//     title: 'Adeel Khan',
//     description: '2020-Arid-0001',
//     avatar: 'URL_TO_ADEEL_KHAN_AVATAR', // Replace with actual avatar URL
//   },
//   {
//     title: 'Adeel Khan',
//     description: '2020-Arid-0001',
//     avatar: 'URL_TO_ADEEL_KHAN_AVATAR', // Replace with actual avatar URL
//   },
//   {
//     title: 'Adeel Khan',
//     description: '2020-Arid-0001',
//     avatar: 'URL_TO_ADEEL_KHAN_AVATAR', // Replace with actual avatar URL
//   },
//   // ... Add more items as needed
// ];

// const App = () => (
//   <List
//     itemLayout="horizontal"
//     dataSource={dataList}
//     renderItem={item => (
//       <List.Item>
//         <List.Item.Meta
//           avatar={<Avatar src={item.avatar} />}
//           title={item.title}
//           description={item.description}
//         />
//       </List.Item>
//     )}
//   />
// );

// export default App;



// import React from 'react';
// import { Card } from 'antd';
// import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined } from '@ant-design/icons';

// const DocumentCard = ({ document }) => {
//   const getDocumentIcon = () => {
//     const fileType = document.type.toLowerCase();
//     if (fileType === 'pdf') {
//       return <FilePdfOutlined style={{ fontSize: '100px' }} />;
//     } else if (fileType === 'xls' || fileType === 'xlsx') {
//       return <FileExcelOutlined style={{ fontSize: '100px' }} />;
//     } else if (fileType === 'jpeg' || fileType === 'png') {
//       return <FileImageOutlined style={{ fontSize: '100px' }} />;
//     } else {
//       return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon for unsupported file types
//     }
//   };

//   return (
//     <Card title={document.title} style={{ width: 200 }}>
//       <p>{document.description}</p>
//       {getDocumentIcon()}
//     </Card>
//   );
// };

// const App = () => {
//   const documents = [
//     { title: 'Document 1', description: 'This is a PDF document', type: 'pdf' },
//     { title: 'Document 2', description: 'This is an Excel document', type: 'xls' },
//     { title: 'Document 3', description: 'This is an image document', type: 'jpeg' },
//   ];

//   return (
//     <div className="App">
//       <h1>Document Viewer</h1>
//       {documents.map((document, index) => (
//         <DocumentCard key={index} document={document} />
//       ))}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { List, Button, Modal, Rate, Input } from 'antd';

const students = [
  { name: 'John Doe', arid: 'ARID123' },
  { name: 'Jane Smith', arid: 'ARID124' },
  // Add more students here
];

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');
  const [ratedStudents, setRatedStudents] = useState([]);

  const showModal = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newRatedStudents = [...ratedStudents, { ...selectedStudent, rating, suggestions }];
    setRatedStudents(newRatedStudents);
    setIsModalVisible(false);
    setRating(0);
    setSuggestions('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Rating System</h1>
      <List
        bordered
        dataSource={students}
        renderItem={student => (
          <List.Item key={student.arid}>
            <Button type="link" onClick={() => showModal(student)}>
              {student.name}
            </Button>
          </List.Item>
        )}
      />
      <Modal
        title="Rate Student"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedStudent && (
          <div>
            <p>Name: {selectedStudent.name}</p>
            <p>ARID: {selectedStudent.arid}</p>
            <Rate onChange={value => setRating(value)} value={rating} />
            <Input.TextArea
              rows={4}
              placeholder="Suggestions"
              onChange={e => setSuggestions(e.target.value)}
              value={suggestions}
            />
          </div>
        )}
      </Modal>
      <h2>Rated Students</h2>
      <List
        bordered
        dataSource={ratedStudents}
        renderItem={student => (
          <List.Item key={student.arid}>
            {student.name} (ARID: {student.arid}) - Rated: {student.rating} Stars
          </List.Item>
        )}
      />
    </div>
  );
};
export default App;
