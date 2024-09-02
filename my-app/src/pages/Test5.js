import React, { useState, useEffect } from 'react';
import { Button, Input, List, Avatar, Alert, Spin, Typography } from 'antd';
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
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setIsLoading(false);
        }
    };

    const handleAddButtonPress = async (facultyId) => {
        if (!facultyId) {
            console.error('Invalid faculty ID:', facultyId);
            return;
        }

        try {
            const addResponse = await fetch(`${EndPoint.addFacultyMember}${facultyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (addResponse.ok) {
                Alert.success('Faculty member added as a committee member.');
            } else {
                const errorText = await addResponse.text();
                if (errorText.includes('Already Exist')) {
                    Alert.error('This faculty member is already a committee member.');
                } else {
                    Alert.error('Failed to add faculty member. ' + (errorText ? errorText : 'Please try again later.'));
                }
            }
        } catch (error) {
            console.error('Error adding faculty member:', error);
            Alert.error('An unexpected error occurred. Please try again later.');
        }
    };

    const filteredFacultyMembers = facultyMembers.filter(member =>
        member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add Committee Members</h2>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Search Faculty Members"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <List
                itemLayout="horizontal"
                dataSource={filteredFacultyMembers}
                renderItem={item => (
                    <List.Item
                        actions={[<Button type="primary" onClick={() => handleAddButtonPress(item.facultyId)}>Add</Button>]}
                    >
                        <List.Item.Meta
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AddCommitteeMember;
