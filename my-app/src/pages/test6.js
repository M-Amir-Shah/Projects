import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Button, message, Spin, Alert } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints';

const AddCommitteeMember = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFacultyMembers();
  }, []);

  const fetchFacultyMembers = async () => {
    try {
      const response = await axios.get(`${EndPoint.getFacultyMembers}`);
      setFacultyMembers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch faculty members.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddButtonPress = async (facultyId) => {
    if (!facultyId) {
      console.error('Invalid faculty ID:', facultyId);
      return;
    }

    try {
      const addResponse = await axios.post(`${EndPoint.addCommitteeMember}?id=${facultyId}`);

      if (addResponse.status === 200) {
        message.success('Faculty member added as a committee member.');
        // Optionally, refresh the list after adding a new member
        fetchFacultyMembers();
      } else if (addResponse.status === 302) {
        message.error('This faculty member is already a committee member.');
      } else {
        message.error('Unexpected response status: ' + addResponse.status);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        const errorString = typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage);

        if (errorString.includes('Already Exists')) {
          message.error('This faculty member is already a committee member.');
        } else {
          message.error('Failed to add faculty member. Please try again later.');
        }
      } else {
        console.log('Error adding faculty member:', error);
        message.error('Failed to add faculty member. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#82b7bf', minHeight: '100vh' }}>
      <h2 style={{ color: 'red' }}>Add Committee Members</h2>
      <Input
        placeholder="Search Faculty Members"
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <List
        itemLayout="horizontal"
        dataSource={facultyMembers.filter(member =>
          member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => handleAddButtonPress(item.facultyId)}
              >
                Add
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.profilePic ? `${EndPoint.imageUrl}${item.profilePic}` : 'path/to/default-avatar.png'} />}
              title={item.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AddCommitteeMember;
