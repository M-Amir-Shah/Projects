import React, { useState } from 'react';
import { Button, List, Col, Row, Layout } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import '../Styling/Merit-Base Short-Listing.css'; // Keep this import if needed for other styles
import Search from '../components/SearchingButton.js';

const { Header } = Layout;

const Committee = () => {
    const [members, setMembers] = useState([
        { id: 1, name: 'Ahmad' },
        { id: 2, name: 'Ali' },
        { id: 3, name: 'Muhammad Amir' },
        { id: 4, name: 'Maryam' },
        { id: 5, name: 'Zainab' },
        { id: 6, name: 'Abdullah' },
        { id: 7, name: 'Fatima' },
        { id: 8, name: 'Aisha' },
        { id: 9, name: 'Yusuf' },
        { id: 10, name: 'Khadija' },
        { id: 11, name: 'Ahmad Khan' },
        { id: 12, name: 'Maryam Ali' },
        { id: 13, name: 'Muhammad Ahmed' },
        { id: 14, name: 'Sara Mahmood' },
        { id: 15, name: 'Ali Hassan' },
        { id: 16, name: 'Zainab Malik' },
        { id: 17, name: 'Abdullah Shah' },
        { id: 18, name: 'Fatima Khan' },
        { id: 19, name: 'Aisha Rahman' },
        { id: 20, name: 'Yusuf Ahmed' },
    ]);

    const removeMember = (id) => {
        setMembers(members.filter((member) => member.id !== id));
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
                        <Button type="text" icon={<PlusOutlined />} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h3>Committee Members</h3>
                <form onSubmit={Submit}>
                    <div>
                        <div>
                            <Search placeholder="Name" />
                        </div>
                        <div className="scrollable-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={members}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <button type='primary' onClick={() => removeMember(item.id)}>Remove</button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.name}</a>}
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

export default Committee;
