import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, message, List, Modal, Rate, Input, Form, Avatar, Row, Col, Drawer, Button, Spin } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import axios from 'axios';
import logo from './BiitLogo.jpeg';
import EndPoint from '../endpoints';
import '../Styling/Faculty-Dashboard.css';

const { Header, Content } = Layout;

const fetchFacultyInfo = async (id) => {
  try {
    if (id) {
      const response = await axios.get(`${EndPoint.facultyInfo}?id=${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch faculty info');
      }
    }
  } catch (error) {
    message.error(error.message);
  }
  return {};
};

const StudentDrawer = ({ visible, onClose, switchToCommittee, onLogout, facultyId }) => {
  const [facultyInfo, setFacultyInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getFacultyInfo = async () => {
      const data = await fetchFacultyInfo(facultyId);
      setFacultyInfo(data);
      setLoading(false);
    };
    getFacultyInfo();
  }, [facultyId]);

  const handleLogout = () => {
    onLogout();
    navigate('/Login');
  };

  return (
    <Drawer
      placement="left"
      width={300}
      closable
      onClose={onClose}
      visible={visible}
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="sider-content">
          <Avatar size={64} icon={<UserOutlined />} />
          {/* <h2>{facultyInfo?.name || 'N/A'}</h2> */}
        </div>
      )}
      <br />
      <Button type="primary" onClick={switchToCommittee} style={{ width: '80%' }}>Switch to Committee</Button>
      <br />
      <Button type="primary" onClick={handleLogout} style={{ width: '80%' }}>Logout</Button>
    </Drawer>
  );
};

StudentDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  switchToCommittee: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  facultyId: PropTypes.number.isRequired,
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
            <Input.TextArea value={suggestion} onChange={onSuggestionChange} rows={4} />
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
  const [students, setStudents] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async (id) => {
      try {
        if (id) {
          console.log(`Fetching students with faculty ID: ${id}`);
          const response = await axios.get(`${EndPoint.teachersGraders}?id=${id}`);
          console.log('Response:', response);
          if (response.status === 200) {
            const data = response.data;
            console.log('Fetched graders:', data);
            setStudents(data);
            if (data.length > 0) {
              setFacultyId(data[0].facultyId);
            }
          } else {
            throw new Error('Failed to fetch graders');
          }
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        message.error(error.message);
      }
    };

    if (facultyId !== null) {
      fetchStudents(facultyId);
    } else {
      // Set the facultyId to a default value or fetch it from a relevant source
      const fetchInitialFacultyId = async () => {
        const initialFacultyId = 11; // Replace with the actual method to get initial facultyId
        setFacultyId(initialFacultyId);
        fetchStudents(initialFacultyId); // Fetch students with the initial faculty ID
      };
      fetchInitialFacultyId();
    }
  }, [facultyId]);

  const showDrawer = () => setIsDrawerVisible(true);
  const onCloseDrawer = () => setIsDrawerVisible(false);

  const showModal = (student) => {
    setSelectedStudent(student);
    setRating(studentRatings[student.id]?.rating || 0);
    setSuggestion(studentRatings[student.id]?.suggestion || '');
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const response = await axios.post(`${EndPoint.rateGraderPerformance}`, {
        facultyId: facultyId,
        graderId: selectedStudent.id,
        rate: rating,
        session: selectedStudent.session // Assuming session is available in selectedStudent
      });
      if (response.status === 200) {
        message.success('Grader rated successfully');
        // Update state or handle success scenario
      } else {
        message.error('Failed to rate grader');
      }
    } catch (error) {
      message.error('Failed to rate grader');
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => setIsModalVisible(false);
  const handleRatingChange = (value) => setRating(value);
  const handleSuggestionChange = (e) => setSuggestion(e.target.value);

  const switchToCommittee = async () => {
    try {
      const response = await axios.post(`${EndPoint.switchRole}`, { facultyId: facultyId });
      if (response.status === 200) {
        message.success('Switched to Committee role');
      } else {
        message.error('Failed to switch role');
      }
    } catch (error) {
      message.error('Failed to switch role');
    }
  };

  const logout = () => {
    navigate('/Login');
  };

  return (
    <Layout>
      <Header className="navbar">
        <Row justify="space-between" align="middle">
          <Col>
            <Button icon={<BarsOutlined />} onClick={showDrawer} />
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
          <List
            className="scrollable-list"
            bordered
            dataSource={students}
            renderItem={(student) => (
              <List.Item onClick={() => showModal(student)} style={{ cursor: 'pointer' }}>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={student.name}
                  description={student.arid_no}
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
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
      <StudentDrawer
        visible={isDrawerVisible}
        onClose={onCloseDrawer}
        switchToCommittee={switchToCommittee}
        onLogout={logout}
        facultyId={facultyId}
      />
    </Layout>
  );
};

export default StudentList;
