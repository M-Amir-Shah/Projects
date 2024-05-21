import React from 'react';
import logo from './BiitLogo.jpeg';
import Input from '../components/Input.js';
import Submit from '../components/SubmitButton.js';
import Cancel from '../components/CancelButton.js';
import { Layout, Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import "../Styling/NewPolicies.css"
import { Content } from 'antd/es/layout/layout';
const { Header } = Layout;

const AddNewBudget = () => {
    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} href='.\pages\Budget.js' />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Add New Budget
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content >
                    <Input placeholder="Enter Amount" /><br/>
                    <Input placeholder="Session"/><br/>
                    <Submit/>
                    <br/>
                    <Cancel/>
                </Content>
            </div>
        </div>
    );
};

export default AddNewBudget;
