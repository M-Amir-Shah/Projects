import React, { useState, useEffect } from 'react';
import { Button, List, Col, Row, Layout, Avatar, message, Spin } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';
import '../Styling/Committee-Members.css';

const { Header } = Layout;

const fetchStudentRecords = async () => {
    try {
        const response = await fetch(EndPoint.getCommitteeMembers);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching student records:', error);
        message.error('Failed to load student records.');
        return [];
    }
};

const removeMemberFromDB = async (memberId) => {
    try {
        const response = await fetch(`${EndPoint.getCommitteeMembers}/${memberId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message.success('Member removed successfully');
    } catch (error) {
        console.error('Error removing member:', error);
        message.error('Failed to remove member.');
    }
};

const CommitteeMembers = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStudentRecords = async () => {
            setLoading(true);
            const data = await fetchStudentRecords();
            setApplications(data);
            setLoading(false);
        };

        loadStudentRecords();
    }, []);

    const handleRemoveMember = async (memberId) => {
        await removeMemberFromDB(memberId);
        setApplications(applications.filter(member => member.id !== memberId));
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={() => navigate('/Admin-Dashboard')} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#fff' }}>
                        BIIT Committee Members
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/Faculty-Members')} icon={<PlusOutlined />} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Committee Members</h2>
                <div className="scrollable-list">
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={applications}
                            renderItem={item => (
                                <List.Item
                                    //actions={[<Button icon={<CloseOutlined />} onClick={() => handleRemoveMember(item.id)} danger>Remove</Button>]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            item.profilePic ? 
                                            <Avatar size={64} src={item.profilePic} /> : 
                                            <Avatar size={64} icon={<UserOutlined />} />
                                        }
                                        title={item.name}
                                        description={item.contactNo}
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommitteeMembers;
