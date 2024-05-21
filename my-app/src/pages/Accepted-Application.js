// MeritBase.js
import React, { useState } from 'react';
import '../Styling/Accepted-Application.css';
import { Button, List, Col, Row, Layout, Avatar } from 'antd';
import logo from './BiitLogo.jpeg';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AcceptedApplication = () => {
    const [applications, setApplications] = useState([
        { name: 'Muhammad Amir', id: '2022-Arid-3610' },
        { name: 'Usman Akbar', id: '2021-Arid-3718' },
        { name: 'Muhammad Bashir', id: '2023-Arid-3455' },
        { name: 'Abdul Islam', id: '2023-Arid-1010' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611' },
        { name: 'Abdul Islam', id: '2023-Arid-1010' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611' },
        { name: 'Muhammad Amir', id: '2022-Arid-3610' },
        { name: 'Usman Akbar', id: '2021-Arid-3718' },
        { name: 'Muhammad Bashir', id: '2023-Arid-3455' },
        { name: 'Abdul Islam', id: '2023-Arid-1010' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611' },
        { name: 'Abdul Islam', id: '2023-Arid-1010' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611' },
    ]);

    const [selectedOption, setSelectedOption] = useState('');
    const SelectChange = (event) => {
        setSelectedOption(event.target.value);
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
                <h3>Accepted Applications</h3>
                <form onSubmit={Submit}>
                    <div>
                        <div >
                            <select value={selectedOption} onChange={SelectChange} style={{ width: '100%', textAlign: 'center' }}>
                                <option value="">---Select---</option>
                                <option value="needbase">NeedBase</option>
                                <option value="meritbase">MeritBase</option>
                            </select>
                        </div>
                        <div className="scrollable-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={applications}
                                renderItem={item => (
                                    <List.Item>
                                        <Avatar size={64} icon={<UserOutlined />} />
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.id}
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

export default AcceptedApplication;
