import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, List, Input, message } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import "../Styling/Budget.css";
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";
import EndPoint from '../endpoints';

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const [budgetList, setBudgetList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const balanceCheck = async () => {
        try {
            const response = await axios.get(EndPoint.getBalance);
            console.log('API Response:', response.data);
            const balanceData = response.data;
            setRemainingBalance(balanceData || 0);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching balance data:', error);
            message.error('Failed to fetch balance data.');
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await fetch(`${EndPoint.budgethistory}`);
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
        navigate('/Budget-Add');
    };

    const Back = (event) => {
        event.preventDefault();
        navigate('/Admin-Dashboard');
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredBudgetList = budgetList.filter(item =>
        item.budget_session.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Calculate the total amount
    const totalAmount = filteredBudgetList.reduce((sum, item) => sum + item.budgetAmount, 0);

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
                        <label>Total Amount: {totalAmount}</label>
                        <br />
                        <Input 
                            placeholder="Search" 
                            value={searchInput} 
                            onChange={handleSearchInputChange} 
                            style={{ marginBottom: '20px' }}
                        />
                        <div className="scrollable-list">
                            <br />
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={filteredBudgetList}
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
