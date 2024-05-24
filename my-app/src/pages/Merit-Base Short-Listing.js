// MeritBase.js
import React, { useState } from 'react';
import '../Styling/Merit-Base Short-Listing.css'; // Keep this import if needed for other styles
import Search from '../components/SearchingButton.js';
import Input from '../components/Input.js';
import { Button, List, Col, Row, Layout} from 'antd';
import logo from './BiitLogo.jpeg';
import { CheckOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const MeritBase = () => {
    const history = useNavigate;
    const [applications, setApplications] = useState([
        { name: 'Muhammad Amir', id: '2022-Arid-3610', status: 'pending' },
        { name: 'Usman Akbar', id: '2021-Arid-3718', status: 'accepted' },
        { name: 'Muhammad Bashir', id: '2023-Arid-3455', status: 'accepted' },
        { name: 'Abdul Islam', id: '2023-Arid-1010', status: 'pending' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611', status: 'accepted' },
        { name: 'Abdul Islam', id: '2023-Arid-1010', status: 'pending' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611', status: 'accepted' },
        { name: 'Muhammad Amir', id: '2022-Arid-3610', status: 'pending' },
        { name: 'Usman Akbar', id: '2021-Arid-3718', status: 'accepted' },
        { name: 'Muhammad Bashir', id: '2023-Arid-3455', status: 'accepted' },
        { name: 'Abdul Islam', id: '2023-Arid-1010', status: 'pending' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611', status: 'accepted' },
        { name: 'Abdul Islam', id: '2023-Arid-1010', status: 'pending' },
        { name: 'Raja Inam Ullah', id: '2020-Arid-3611', status: 'accepted' },
    ]);

    const handleAccept = (id) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: 'accepted' } : app
        ));
    };

    const handleReject = (id) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: 'rejected' } : app
        ));
    };
    const Back = (event) => {
        history(-1);
    };
    const Submit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
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
                <h3>MeritBase Short Listing Applications</h3>
                <form onSubmit={Submit}>
                    <div>
                        <div>
                            <Search placeholder="Arid Number" />
                            <label>Section</label>
                            <Input placeholder='Enter Section' />
                        </div>
                        <div className="scrollable-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={applications}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button type="primary" icon={<CheckOutlined />} onClick={() => handleAccept(item.id)} />,
                                            <Button type="danger" icon={<CloseOutlined />} onClick={() => handleReject(item.id)} />
                                        ]}
                                    >
                                        <List.Item.Meta
                                            
                                            title={<a href="https://ant.design">{item.name}</a>}
                                            description={item.id}
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
