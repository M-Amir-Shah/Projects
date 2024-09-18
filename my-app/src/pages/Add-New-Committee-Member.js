import React, { useState, useEffect } from 'react';
import '../Styling/Add-Committee-Member.css'; // Import CSS for styling
import { Input, List, Avatar, Button, message, Spin, Alert, Col, Row, Layout } from 'antd';
import axios from 'axios';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import EndPoint from '../endpoints.js';

const { Header } = Layout;

const AddCommitteeMember = (props) => {
    const navigate = useNavigate();
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

    const handleBack = () => {
        navigate('/Admin-Dashboard');
    };

    // Filter faculty members based on search query
    const filteredFacultyMembers = facultyMembers.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h3>Add Committee Member</h3>
                <form>
                    <div>
                        <div>
                            <Input
                                placeholder="Search Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                            />
                        </div>
                        <div className="scrollable-list">
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCommitteeMember;
