import React, { useState, useEffect } from 'react';
import '../Styling/Faculty-Member.css';
import { Button, List, Col, Row, Layout, Avatar, message, Spin } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';
import logo from './BiitLogo.jpeg';
const { Header } = Layout;

const fetchStudentRecords = async () => {
    try {
        const response = await fetch(EndPoint.getFacultyMembers);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Faculty Members:', error);
        message.error('Failed to load Faculty Members.');
        return [];
    }
};

// const removeMemberFromDB = async (memberId) => {
//     try {
//         const response = await fetch(`${EndPoint.getCommitteeMembers}/${memberId}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         message.success('Member removed successfully');
//     } catch (error) {
//         console.error('Error removing member:', error);
//         message.error('Failed to remove member.');
//     }
// };

const CommitteeMembers = () => {
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState([]);
    const [profilePic, setProfilePic] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStudentRecords = async () => {
            setLoading(true);
            const data = await fetchStudentRecords();
            setFaculty(data);
            setLoading(false);
        };

        loadStudentRecords();
    }, []);

    const Back = () => {
        navigate('/Committee-Members');
    };

    const Submit = (event) => {
        event.preventDefault();
    };

    // const handleRemoveMember = async (memberId) => {
    //     await removeMemberFromDB(memberId);
    //     // After successful removal, update the state to reflect the changes
    //     const updatedfaculty = faculty.filter(member => member.id !== memberId);
    //     setFaculty(updatedfaculty);
    // };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Faculty-Members
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Faculty-Members</h2>
                <form onSubmit={Submit}>
                    <div className="scrollable-list">
                        {loading ? (
                            <div style={{ textAlign: 'center' }}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={faculty}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.profilePic} />}
                                            title={item.name}
                                        />
                                        {/* Uncomment the following line to add a "Remove" button */}
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
