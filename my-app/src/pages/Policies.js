import React from 'react';
import Searching from "../components/SearchingButton";
import Edit from '../components/EditableTextField';
import { Layout, Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import "../Styling/Policies.css"
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const history = useNavigate();

    const AddPolicies = (event) => {
        event.preventDefault();
        history('/NewPolicies');
    };
    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize:'X-large'}}>
                        Policies
                    </Col>
                    <Col>
                        <Button type="text" icon={<PlusOutlined />} onClick={AddPolicies}/>
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content >
                    <Card title="Apply Before" className="deadline">1-Feb-2026</Card>
                    <br />
                    <Searching placeholder="Search " />
                    <br />
                    <Edit initialValue="NeedBase Required CGPA  3.7 Student having CGPA 3.7 or above are Eligible" />
                    <br />
                    <Edit initialValue="MeritBase Required CGPA  3.7 Top 3 Student with Min CGPA 3.7 if Strength greater than 40" />
                    <Edit initialValue="NeedBase Required CGPA  3.7 Student having CGPA 3.7 or above are Eligible" />
                    <br />
                    <Edit initialValue="MeritBase Required CGPA  3.7 Top 3 Student with Min CGPA 3.7 if Strength greater than 40" />
                    <Edit initialValue="NeedBase Required CGPA  3.7 Student having CGPA 3.7 or above are Eligible" />
                    <br />
                    <Edit initialValue="MeritBase Required CGPA  3.7 Top 3 Student with Min CGPA 3.7 if Strength greater than 40" />
                    <Edit initialValue="NeedBase Required CGPA  3.7 Student having CGPA 3.7 or above are Eligible" />
                    <br />
                    <Edit initialValue="MeritBase Required CGPA  3.7 Top 3 Student with Min CGPA 3.7 if Strength greater than 40" />
                    
                </Content>
            </div>
        </div>
    );
};

export default Navbar;
