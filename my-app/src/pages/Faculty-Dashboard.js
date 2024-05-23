import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Card, Layout, message, List, Modal, Rate, Input, Form, Avatar, Row, Col, Drawer, Button } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import '../Styling/Faculty-Dashboard.css';

const { Header, Content } = Layout;

const students = [
  { id: 1, name: 'Ali Raza', arid: '2020-Arid-0011', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Babar', arid: '2020-Arid-0012', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'M Amir Shahzad', arid: '2020-Arid-0013', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Abdul Islam', arid: '2020-Arid-0014', avatar: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Usman Akbar', arid: '2020-Arid-0015', avatar: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Muhammad Bashir', arid: '2020-Arid-0016', avatar: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Ali Ahmad', arid: '2020-Arid-3611', avatar: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Rizan', arid: '2020-Arid-3612', avatar: 'https://via.placeholder.com/40' },
  { id: 9, name: 'Shahzad', arid: '2020-Arid-3613', avatar: 'https://via.placeholder.com/40' },
  { id: 10, name: 'Abdul Rehman', arid: '2020-Arid-3614', avatar: 'https://via.placeholder.com/40' },
  { id: 11, name: 'Usman saeed', arid: '2020-Arid-3615', avatar: 'https://via.placeholder.com/40' },
  { id: 12, name: 'zeeshan Rafiq', arid: '2020-Arid-3616', avatar: 'https://via.placeholder.com/40' },
];

const StudentDrawer = ({ visible, onClose, onBalanceCheck, onLogout }) => (
  <Drawer
    placement="left"
    width={300}
    closable
    onClose={onClose}
    visible={visible}
    bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    <div className="sider-content">
      <Avatar size={64} icon={<UserOutlined />} />
    </div>
    <br />
    <Button type="primary" onClick={onBalanceCheck} style={{ width: '80%' }}>Switch to Committee</Button>
    <br />
    <Button type="primary" onClick={onLogout} style={{ width: '80%' }}>Logout</Button>
  </Drawer>
);

StudentDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBalanceCheck: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const StudentModal = ({ visible, student, rating, suggestion, onRatingChange, onSuggestionChange, onOk, onCancel }) => (
  <Modal
    title={`Rate ${student ? student.name : ''}`}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    {student && (
      <div>
        <p>Name: {student.name}</p>
        <p>ARID: {student.arid}</p>
        <Form>
          <Form.Item label="Rating">
            <Rate onChange={onRatingChange} value={rating} />
          </Form.Item>
          <Form.Item label="Suggestion">
            <Input.TextArea
              value={suggestion}
              onChange={onSuggestionChange}
              rows={4}
            />
          </Form.Item>
        </Form>
      </div>
    )}
  </Modal>
);

StudentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  student: PropTypes.object,
  rating: PropTypes.number.isRequired,
  suggestion: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onSuggestionChange: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const StudentList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [studentRatings, setStudentRatings] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  const showDrawer = () => setIsDrawerVisible(true);
  const onClose = () => setIsDrawerVisible(false);

  const showModal = (student) => {
    setSelectedStudent(student);
    setRating(studentRatings[student.id]?.rating || 0);
    setSuggestion(studentRatings[student.id]?.suggestion || '');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setStudentRatings((prev) => ({
      ...prev,
      [selectedStudent.id]: { rating, suggestion },
    }));
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);
  const handleRatingChange = (value) => setRating(value);
  const handleSuggestionChange = (e) => setSuggestion(e.target.value);
  const BalanceCheck = () => message.success('Remaining Balance is $500.');

  return (
    <div>
      <Header className="navbar">
        <Row justify="space-between" align="middle">
          <Col>
            <div style={{ padding: '5px' }}>
              <Button icon={<BarsOutlined />} onClick={showDrawer} />
            </div>
          </Col>
          <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#fff' }}>
            BIIT Faculty-DashBoard
          </Col>
          <Col>
            <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
          </Col>
        </Row>
      </Header>
      <Content className='container'>
        <div className="form-box">
          <header><h1>Graders List</h1></header>
          <List className="scrollable-list"
            bordered
            dataSource={students}
            renderItem={(student) => (
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
        </div>
      </Content>
      <StudentModal
        visible={isModalVisible}
        student={selectedStudent}
        rating={rating}
        suggestion={suggestion}
        onRatingChange={handleRatingChange}
        onSuggestionChange={handleSuggestionChange}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <StudentDrawer
        visible={isDrawerVisible}
        onClose={onClose}
        onBalanceCheck={BalanceCheck}
        onLogout={openPopup}
      />
    </div>
  );
};

export default StudentList;
