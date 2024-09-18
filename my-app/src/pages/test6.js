import React, { useState, useEffect } from 'react';
import { Button, Input, List, Avatar, Spin, Alert, Space, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints';

const { Text } = Typography;

const AddCommitteeMember = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFacultyMembers();
  }, []);

  const fetchFacultyMembers = async () => {
    try {
      const response = await fetch(`${EndPoint.getFacultyMembers}`);
      if (!response.ok) {
        throw new Error('Failed to fetch faculty members');
      }
      const data = await response.json();
      setFacultyMembers(data);
      setIsLoading(false);
      console.log('Response : ',response.data);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleAddButtonPress = async (facultyId) => {
    if (!facultyId) {
      return;
    }
  
    try {
      const response = await fetch(`${EndPoint.addCommitteeMember}${facultyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is ok
      if (response.ok) {
        // Read the response text if needed
        const responseText = await response.text();
        message.success('Faculty member added as a committee member.');
        console.log('Response Text: ', responseText);
      } else {
        const errorText = await response.text();
        if (errorText.includes('Already Exist')) {
          message.error('This faculty member is already a committee member.');
        } else {
          message.error('Failed to add faculty member. ' + (errorText ? errorText : 'Please try again later.'));
        }
      }
    } catch (error) {
      message.error('An unexpected error occurred. Please try again later.');
    }
  };

  
  const filteredMembers = facultyMembers.filter(member =>
    member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={`Error: ${error.message}`} type="error" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>Add Committee Members</Text>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search Faculty Members"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <List
          itemLayout="horizontal"
          dataSource={filteredMembers}
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
                avatar={
                  <Avatar src={item.profilePic ? `${EndPoint.imageUrl}` + item.profilePic : '/logo.png'} />
                }
                title={item.name}
              />
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default AddCommitteeMember;
