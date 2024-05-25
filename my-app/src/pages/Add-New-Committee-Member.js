import React, { useState, useEffect } from 'react';
import '../Styling/Add-Committee-Member.css'; // Keep this import if needed for other styles
import Search from '../components/SearchingButton.js';
import { Button, List, Col, Row, Layout, message } from 'antd';
import logo from './BiitLogo.jpeg';
import { CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints'; // Import your API endpoints file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
const { Header } = Layout;

const MeritBase = () => {
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [applications, setApplications] = useState([]); // State variable to store applications data
    const navigate = useNavigate(); // Get the navigate function from useNavigate hook

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true); // Set loading state to true while fetching data
                const response = await fetch(EndPoint.addCommitteeMember); // Fetch data from API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json(); // Parse JSON response
                setApplications(data); // Set fetched data to state
            } catch (error) {
                console.error('Error fetching :', error);
                message.error('Failed to fetch  data.');
            } finally {
                setLoading(false); // Set loading state back to false after fetching data
            }
        };

        fetchApplications(); // Call the fetchApplications function when component mounts
    }, []);

    const handleAccept = (id) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: 'Already Member' } : app
        ));
        message.success('Successfully Added');
    };

    const handleReject = (id) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: 'Not Member' } : app
        ));
    };

    const Submit = (event) => {
        event.preventDefault();
    };

    const Back = () => {
        navigate('/Admin-Dashboard');
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={Back} />
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
                <form onSubmit={Submit}>
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
                                            <Button type="primary" icon={<CheckOutlined />} onClick={() => handleAccept(item.id)} />,
                                            <Button type="danger" onClick={() => handleReject(item.id)}>Reject</Button>
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
