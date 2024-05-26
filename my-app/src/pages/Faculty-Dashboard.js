import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './BiitLogo.jpeg';
import { Card, Layout, message, List, Modal, Rate, Input, Form, Avatar, Row, Col, Drawer, Button } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import '../Styling/Faculty-Dashboard.css';
import EndPoint from '../endpoints';

const { Header, Content } = Layout;

// The Drawer component for the user menu
const StudentDrawer = ({ visible, onClose, switchToCommittee, onLogout }) => (
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
    <Button type="primary" onClick={switchToCommittee} style={{ width: '80%' }}>Switch to Committee</Button>
    <br />
    <Button type="primary" onClick={onLogout} style={{ width: '80%' }}>Logout</Button>
  </Drawer>
);

StudentDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  switchToCommittee: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

// The Modal component for rating and suggestion
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
  const [students, setStudents] = useState([]);
  const [memberId, setMemberId] = useState(null); // Assuming memberId is fetched from somewhere

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${EndPoint.teachersGraders}`);
        const data = await response.json();
        setStudents(data);
        if (data.length > 0) {
          setMemberId(data[0].memberId); // Set the memberId if available in the data
        }
      } catch (error) {
        message.error('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

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

  const switchToCommittee = async () => {
    try {
      const response = await fetch(`${EndPoint.switchRole}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId }),
      });
      if (response.ok) {
        message.success('Switched to Committee role');
      } else {
        message.error('Failed to switch role');
      }
    } catch (error) {
      message.error('Failed to switch role');
    }
  };

  const handleLogout = () => {
    // Perform any logout operations here
    navigate('/Login'); // Navigate to the login page
  };

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
                  avatar={<Avatar src={student.avatar || 'https://via.placeholder.com/40'} />}
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
        switchToCommittee={switchToCommittee}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default StudentList;
