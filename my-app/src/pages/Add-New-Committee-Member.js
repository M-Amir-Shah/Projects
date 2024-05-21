// MeritBase.js
import React, { useState } from 'react';
import '../Styling/Add-Committee-Member.css'; // Keep this import if needed for other styles
import Search from '../components/SearchingButton.js';
import { Button, List, Col, Row, Layout,message } from 'antd';
import logo from './BiitLogo.jpeg';
import { CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MeritBase = () => {
    const [applications, setApplications] = useState([
        { name: 'Muhammad Aftab Khan', status: 'pending' },
        { name: 'Umar Farooq', status: 'Already Member' },
        { name: 'Muhammad Zahid', status: 'Already Member' },
        { name: 'Shahid Jamil', status: 'pending' },
        { name: 'Adeel Sohail', status: 'Already Member' },
        { name: 'Shahid Abid', status: 'pending' },
        { name: 'Qasim Shahzad', status: 'Already Member' },
        { name: 'Zeeshan Muzzafar', status: 'pending' },
        { name: 'Mam Sumeria', status: 'Already Member' },
        { name: 'Amir Rasheed', status: 'Already Member' },
        { name: 'Saeed Watto', status: 'pending' },
        { name: 'Shahid Rasheed', status: 'Already Member' },
        { name: 'Abdul Islam', status: 'pending' },
        { name: 'Raja Inam Ullah', status: 'Already Member' },
    ]);

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

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} />
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
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button type="primary" icon={<CheckOutlined />} onClick={() => handleAccept(item.id)} />
                                            
                                        ]}
                                    >
                                        <List.Item.Meta

                                            title={<a href="https://ant.design">{item.name}</a>}

                                        />
                                        {/* <Badge status={item.status === 'accepted' ? 'success' : item.status === 'rejected' ? 'error' : 'default'} /> */}
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
