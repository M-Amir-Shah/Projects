import React, { useState, useEffect } from 'react';
import '../Styling/Add-Committee-Member.css'; // Keep this import if needed for other styles
import Search from '../components/SearchingButton.js';
import { Button, List, Col, Row, Layout, message } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import Axios
import EndPoint from '../endpoints.js';

const { Header } = Layout;

const MeritBase = () => {
    const [loading, setLoading] = useState(false); 
    const [applications, setApplications] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true); 
                const response = await axios.get(EndPoint.getFacultyMembers); 
                setApplications(response.data); 
            } catch (error) {
                console.error('Error fetching:', error);
                message.error('Failed to fetch data.');
            } finally {
                setLoading(false); 
            }
        };

        fetchApplications();
    }, []);

    const handleAccept = async (id) => {
    try {
        const response = await axios.post(EndPoint.addCommitteeMember, { id });

        if (response.status === 200) {
            setApplications(applications.map(app =>
                app.id === id ? { ...app, status: 'Already Member' } : app
            ));
            message.success('Successfully Added');
        } else if (response.status === 302) {
            message.error('Already Exists');
        } else {
            message.error('Failed to add member.');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            message.error(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            message.error('No response received from server.');
        } else {
            message.error('Failed to add member.');
        }
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
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack} />
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
                <form >
                    <div>
                        <div>
                            <Search placeholder="Search Name" />
                        </div>
                        <div className="scrollable-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={applications}
                                loading={loading}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button type="primary"  onClick={() => handleAccept(item.id)} >Add</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.status}
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
