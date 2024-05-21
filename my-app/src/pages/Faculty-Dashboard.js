import React, { useState } from 'react';
import { List, Modal, Rate, Input, Form, Avatar } from 'antd';

const students = [
  { id: 1, name: 'Alice', arid: '2020-Arid-0011', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Bob', arid: '2020-Arid-0012', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Charlie', arid: '2020-Arid-0013', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Jorden', arid: '2020-Arid-0014', avatar: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Gayal', arid: '2020-Arid-0015', avatar: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Alex', arid: '2020-Arid-0016', avatar: 'https://via.placeholder.com/40' },
];

const StudentList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [studentRatings, setStudentRatings] = useState({});

  const showModal = (student) => {
    setSelectedStudent(student);
    setRating(studentRatings[student.id]?.rating || 0);
    setSuggestion(studentRatings[student.id]?.suggestion || '');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setStudentRatings(prev => ({
      ...prev,
      [selectedStudent.id]: { rating, suggestion }
    }));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  return (
    <div>
      <List
        header={<div>Student List</div>}
        bordered
        dataSource={students}
        renderItem={student => (
          <List.Item onClick={() => showModal(student)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              avatar={<Avatar src={student.avatar} />}
              title={student.name}
              description={student.arid}
            />
            {studentRatings[student.id] && (
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <Rate disabled value={studentRatings[student.id].rating} />
                {studentRatings[student.id].suggestion && (
                  <div>Suggestion: {studentRatings[student.id].suggestion}</div>
                )}
              </div>
            )}
          </List.Item>
        )}
      />
      <Modal
      
        title={`Rate ${selectedStudent ? selectedStudent.name : ''}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedStudent && (
          <div>
            <p>Name: {selectedStudent.name}</p>
            <p>ARID: {selectedStudent.arid}</p>
            <Form>
              <Form.Item label="Rating">
                <Rate onChange={handleRatingChange} value={rating} />
              </Form.Item>
              <Form.Item label="Suggestion">
                <Input.TextArea
                  value={suggestion}
                  onChange={handleSuggestionChange}
                  rows={4}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
