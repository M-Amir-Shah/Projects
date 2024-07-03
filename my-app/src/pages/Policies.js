import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import "../Styling/Policies.css";
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

    const AddPolicies = (event) => {
        event.preventDefault();
        history('/NewPolicies');
    };

    const Back = (event) => {
        event.preventDefault();
        history(-1);
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Policies
                    </Col>
                    <Col>
                        <Button icon={<PlusOutlined />} onClick={AddPolicies} />
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
                        policies.map((policy, index) => (
                            <div key={index}>
                                <Card>
                                    <p><b>Session: </b>{policy.p.session}</p>
                                    <p><b>Policy For: </b>{policy.p.policyfor}</p>
                                    <p><b>Description: </b>{policy.c.description }</p>
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
