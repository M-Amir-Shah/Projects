import React from 'react';
import Searching from "../components/SearchingButton";
import { Layout, Row, Col, Button, List } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import "../Styling/Budget.css"
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate(); // Correctly use useNavigate hook

    const AddBudget = (event) => {
        event.preventDefault();
        navigate('/Budget-Add'); // Navigate to '/Budget-Add' route
    };

    const Back = (event) => {
        event.preventDefault();
        navigate('/Admin-Dashboard'); // Navigate to '/Admin-Dashboard' route
    };

    const dataList = [
        {
            title: 'Fall 2023',
            description: '1230000',
        },
        {
            title: 'Summar 2022',
            description: '120000',
        },
    ]

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={Back} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Budget
                    </Col>
                    <Col>
                        <Button type="text" icon={<PlusOutlined />} onClick={AddBudget} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content >
                    <Searching placeholder="Search" />
                    <br />
                    <List
                        itemLayout="horizontal"
                        dataSource={dataList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta 
                                    description={"Amount "+item.description}
                                    title={item.title}
                                />
                            </List.Item>
                        )}
                    />
                </Content>
            </div>
        </div>
    );
};

export default Navbar;
