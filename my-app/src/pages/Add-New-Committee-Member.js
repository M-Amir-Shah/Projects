import React, { useState, useEffect } from 'react';
import '../Styling/Add-Committee-Member.css'; // Import CSS for styling
import Search from '../components/SearchingButton.js';
import { Button, List, Col, Row, Layout, message, Avatar, Input } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import EndPoint from '../endpoints.js';

const { Header } = Layout;

const MeritBase = () => {
    const navigate = useNavigate();
    const [facultyMembers, setFacultyMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [addedMembers, setAddedMembers] = useState({});

    useEffect(() => {
        // Fetch faculty members on component mount
        const fetchFacultyMembers = async () => {
            try {
                const response = await fetch(`${EndPoint.getFacultyMembers}`); // Use fetch instead of axios
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFacultyMembers(data);
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch faculty members:', error);
            }
        };

        fetchFacultyMembers();
    }, []);

    const handleAdd = async (id) => {
        try {
            const response = await fetch(EndPoint.addCommitteeMember, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setAddedMembers(prev => ({ ...prev, [id]: true })); // Mark this member as added
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
                                dataSource={filteredFacultyMembers} // Use filtered list
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type="primary"
                                                onClick={() => handleAdd(item.id)}
                                                disabled={addedMembers[item.id]}
                                            >
                                                {addedMembers[item.id] ? 'Added' : 'Add'}
                                            </Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                            title={item.name}
                                            description={item.contactNo}
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
