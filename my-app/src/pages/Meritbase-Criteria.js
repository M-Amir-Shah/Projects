import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "../Styling/Criterias.css";
import logo from './BiitLogo.jpeg';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints';

const { Header, Content } = Layout;

const Navbar = () => {
    const history = useNavigate();
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await fetch(`${EndPoint.getPolicies}`);
                if (response.ok) {
                    const data = await response.json();
                    setPolicies(data);
                } else {
                    const errorText = await response.text();
                    throw new Error(`Error fetching policies: ${response.status} ${response.statusText} - ${errorText}`);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching policies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    const navigateToDashboard = () => {
        history('/StudentDashboard');
    };

    // Filter policies array to show only 'MeritBase' policies
    const filteredPolicies = policies.filter(policy => policy.p.policyfor === 'MeritBase');

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={navigateToDashboard} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        MeritBase Criteria
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT logo" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        filteredPolicies.map((item, index) => (
                            <div key={index}>
                                <Card>
                                    <p><b>Session: </b>{item.p.session}</p>
                                    <p><b>Policy: </b>{item.p.policyfor}</p>
                                    <p><b>Depend on: </b>{item.p.policy1}</p>
                                    <p><b>Description: </b>{item.p.Criteria[0].description}</p>
                                </Card>
                                <br />
                            </div>
                        ))
                    )}
                </Content>
            </div>
        </div>
    );
};

export default Navbar;
