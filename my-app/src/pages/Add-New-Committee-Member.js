import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import '../Styling/Add-Committee-Member.css'; // Import CSS for styling
import Search from '../components/SearchingButton.js';
import { Button, List, Col, Row, Layout, message, Avatar } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import EndPoint from '../endpoints.js';

const { Header } = Layout;

const MeritBase = () => {
    const navigate = useNavigate();
    const [facultyMembers, setFacultyMembers] = useState([]);

    useEffect(() => {
        // Fetch faculty members on component mount
        const fetchFacultyMembers = async () => {
            try {
                const response = await axios.get(`${EndPoint.getFacultyMembers}`); // Adjust endpoint as needed
                setFacultyMembers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch faculty members:', error);
                
            }
        };

        fetchFacultyMembers();
    }, []);

    const handleAdd = async (id) => {
        try {
            await axios.post(EndPoint.addCommitteeMember, { id }); // Adjust endpoint and data as needed
            message.success('Successfully Added');
            console.log('Response');
        } catch (error) {
            console.error('Failed to add member:', error);
            message.error('Failed to add member');
        }
    };

    const handleBack = () => {
        navigate('/Admin-Dashboard');
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button  icon={<ArrowLeftOutlined />} onClick={handleBack} />
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
                            <Search placeholder="Search Name" />
                        </div>
                        <div className="scrollable-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={facultyMembers}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button type="primary" onClick={() => handleAdd(item.id)}>Add</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
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

export default MeritBase;
