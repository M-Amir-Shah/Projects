import React, { useState, useEffect } from 'react';
import '../Styling/Committee-Members.css';
import { Button, List, Col, Row, Layout, Avatar, message, Spin } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';
const { Header } = Layout;

const fetchStudentRecords = async () => {
    try {
        const response = await fetch(EndPoint.getCommitteeMembers);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
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

    const Back = () => {
        navigate('/Admin-Dashboard');
    };
    const Add = () => {
        navigate('/Faculty-Members');
    };
    const Submit = (event) => {
        event.preventDefault();
    };

    const handleRemoveMember = async (memberId) => {
        await removeMemberFromDB(memberId);
        // After successful removal, update the state to reflect the changes
        const updatedApplications = applications.filter(member => member.id !== memberId);
        setApplications(updatedApplications);
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Committee-Members
                    </Col>
                    <Col>
                        <Button onClick={Add} icon={<PlusOutlined />} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Committee-Members</h2>
                <form onSubmit={Submit}>
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
                                    <List.Item>
                                        <List.Item.Meta
                                        // <Avatar size={64} src={Image} />
                                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                            title={item.name}
                                        />
                                        {/* <Button icon={<CloseOutlined />} onClick={() => handleRemoveMember(item.id)} danger>Remove</Button> */}
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommitteeMembers;
