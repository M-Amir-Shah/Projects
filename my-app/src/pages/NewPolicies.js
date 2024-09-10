import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Layout, Row, Col, Button, Radio, Input, Select, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "../Styling/NewPolicies.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const NeedMeritPolicy = () => {
    const [description, setDescription] = useState('');
    const [policyFor, setPolicyFor] = useState('--Select Type--');
    const [policy, setPolicy]= useState('');
    const [strength, setStrength]= useState('');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const formData = {
                description,
                val1,
                val2,
                policyFor, // Adjusted to match the backend parameter
                policy,
                strength
            };

            const response = await axios.post(EndPoint.addPolicies, formData, {
                headers: {
                    'Content-Type': 'application/json' // Changed to JSON as your backend isn't expecting form-data
                }
            });
            console.log(response.data);
            message.success('Added Successfully');
            navigate('/Admin-Dashboard');
        }
        catch(error){
            message.error('Failed To Add Policies.');
        }
    };

    const handleSelectionChange = (value) => {
        setPolicyFor(value);
    };

    const handleMeritTypeChange = (e) => {
        setSelectedOption(e.target.value);
        setPolicy(e.target.value); // Update the policy based on selected merit type
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} />
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
                        <Select onChange={handleSelectionChange} value={policyFor}>
                            <Option value="Needbase">Needbase</Option>
                            <Option value="Meritbase">Meritbase</Option>
                        </Select>
                        {policyFor === 'Needbase' && (
                            <>
                                <br/>
                                <label htmlFor="val1">Minimum CGPA:</label>
                                <Input id="val1" type="text" placeholder="Minimum CGPA" value={val1} onChange={(e) => setVal1(e.target.value)} />
                            </>
                        )}
                        {policyFor === 'Meritbase' && (
                            <>
                                <br/>
                                <label>Merit Type:</label>
                                <br/>
                                <Radio.Group onChange={handleMeritTypeChange} value={selectedOption}>
                                    <Radio value="CGPA">CGPA</Radio>
                                    <Radio value="Strength">Strength</Radio>
                                </Radio.Group>
                                {selectedOption === 'CGPA' && (
                                    <>
                                        <br/>
                                        <label htmlFor="val1">Minimum CGPA:</label>
                                        <Input id="val1" type="text" placeholder="Minimum CGPA" value={val1} onChange={(e) => setVal1(e.target.value)} />
                                    </>
                                )}
                                {selectedOption === 'Strength' && (
                                    <> 
                                        <br/>
                                        <label htmlFor="val1">Minimum Strength:</label>
                                        <Input id="val1" type="text" placeholder="Minimum Strength" value={val1} onChange={(e) => setVal1(e.target.value)} />
                                        <label htmlFor="val2">Maximum Strength:</label>
                                        <Input id="val2" type="text" placeholder="Maximum Strength" value={val2} onChange={(e) => setVal2(e.target.value)} />
                                    </>
                                )}
                            </>
                        )}
                        <br/>
                        <label htmlFor="description">Policy Description:</label>
                        <TextArea id="description" placeholder="Policy Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                        <div>
                            <br/>
                            <Button type="primary" htmlType="submit">Add</Button>
                            <Button style={{ marginLeft: '8px' }} onClick={handleBack}>Cancel</Button>
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default NeedMeritPolicy;
