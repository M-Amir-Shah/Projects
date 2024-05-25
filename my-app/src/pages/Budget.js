import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, List } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import Searching from "../components/SearchingButton";
import "../Styling/Budget.css";
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints';

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate(); // Correctly use useNavigate hook
    const [budgetList, setBudgetList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await fetch(`${EndPoint.getAllBudget}`); // Replace 'API_ENDPOINT_HERE' with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch budget data');
                }
                const data = await response.json();
                setBudgetList(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        fetchBudgetData();
    }, []);

    const AddBudget = (event) => {
        event.preventDefault();
        navigate('/Budget-Add'); // Navigate to '/Budget-Add' route
    };

    const Back = (event) => {
        event.preventDefault();
        navigate('/Admin-Dashboard'); // Navigate to '/Admin-Dashboard' route
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={Back} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Budget
                    </Col>
                    <Col>
                        <Button icon={<PlusOutlined />} onClick={AddBudget} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content className="form-box">
                <h2 style={{ textAlign: 'center' }}>Budget History</h2>
                    <form>
                        <div className="scrollable-list">
                            <Searching placeholder="Search" />
                            <br />
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={budgetList}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.budget_session}
                                                description={"Amount " + item.budgetAmount}
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default Navbar;
