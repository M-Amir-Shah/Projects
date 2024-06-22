import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Layout, Row, Col, Button, Radio, Input, Select, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "../Styling/NewPolicies.css";
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const NeedMeritPolicy = () => {
    const history = useNavigate();
    const [description,setDescription] = useState('');
    
    const [selection, setSelection] = useState('');
    const [meritType, setMeritType] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleSelectionChange = (value) => {
        setSelection(value);
        setMeritType(''); // Reset merit type when selection changes
    };

    const handleMeritTypeChange = (e) => {
        setMeritType(e.target.value);
    };

    const Back = () => {
        history('/Policies');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating form submission delay with setTimeout
        setTimeout(() => {
            setLoading(false);
            message.success('Form submitted successfully');
            // Further logic can be added here for actual form submission
        }, 2000); // Example delay of 2 seconds
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={Back} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Add New Policies
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="policyFor">Policy Type:</label>
                        <Select id="policyFor" placeholder="Select policy type" onChange={handleSelectionChange}>
                            <Option value="Needbase">Needbase</Option>
                            <Option value="Meritbase">Meritbase</Option>
                        </Select>
                        {selection === 'Needbase' && (
                            <>
                            <br/>
                                <label htmlFor="minimumCGPA">Minimum CGPA:</label>
                                <Input id="minimumCGPA" type="text" placeholder="Minimum CGPA" />
                                <label htmlFor="description">Policy Description:</label>
                                <TextArea id="description" placeholder="Policy Description" rows={4} />
                            </>
                        )}
                        {selection === 'Meritbase' && (
                            <>
                            <br/>
                                <label>Merit Type:</label>
                                <br/>
                                <Radio.Group onChange={handleMeritTypeChange} value={meritType}>
                                    <Radio value="CGPA">CGPA</Radio>
                                    <Radio value="Strength">Strength</Radio>
                                </Radio.Group>
                                {meritType === 'CGPA' && (
                                    <>
                                    <br/>
                                        <label htmlFor="minimumCGPA">Minimum CGPA:</label>
                                        <br/>
                                        <Input id="minimumCGPA" type="text" placeholder="Minimum CGPA" />
                                        <br/>
                                        <label htmlFor="description">Policy Description:</label>
                                        <TextArea id="description" placeholder="Policy Description" rows={4} />
                                    </>
                                )}
                                {meritType === 'Strength' && (
                                    <> 
                                    <br/>
                                        <label htmlFor="minimumStrength">Minimum Strength:</label>
                                        <Input id="minimumStrength" type="text" placeholder="Minimum Strength" />
                                        <label htmlFor="maximumStrength">Maximum Strength:</label>
                                        <Input id="maximumStrength" type="text" placeholder="Maximum Strength" />
                                        <label htmlFor="studentsCount">Students Count:</label>
                                        <Select id="studentsCount" placeholder="Select number">
                                            <Option value="1">1</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">3</Option>
                                        </Select>
                                        <br/>
                                        <label htmlFor="description">Policy Description:</label>
                                        <TextArea id="description" placeholder="Policy Description" rows={4} />
                                    </>
                                )}
                            </>
                        )}
                        <div>
                        <br/>
                        <Button type="primary" htmlType="submit" loading={loading}>Add</Button>
                        <Button style={{ marginLeft: '8px' }} onClick={() => setLoading(false)}>Cancel</Button>
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default NeedMeritPolicy;
