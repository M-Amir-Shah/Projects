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
    const [policyFor, setPolicyFor] = useState('Needbase');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [selectedOption, setSelectedOption] = useState('CGPA'); // Initialize with a default value

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate description field
        if (!description) {
            message.error('Please enter a description');
            return;
        }

        let storedVal1 = '';
        let storedVal2 = '';
        let policy = '';
        let strength = '';

        if (policyFor === 'Needbase') {
            storedVal1 = '3.5'; // Default value for val1
            policy = 'CGPA'; // Set policy to CGPA
            strength = '1'; // Set strength to 1
        } else {
            if (selectedOption === 'CGPA') {
                storedVal1 = val1;
                policy = 'CGPA'; // Set policy to CGPA
                strength = '1'; // Set strength to 1
            } else if (selectedOption === 'Strength') {
                storedVal1 = val1;
                storedVal2 = val2;
                policy = 'Strength'; // Set policy to Strength
            }
        }

        const policyData = {
            description,
            val1: storedVal1,
            val2: storedVal2,
            policyFor,
            policy,
            strength,
        };

        try {
            const response = await axios.post(`${EndPoint.addPolicies}`, policyData);

            if (response.status === 200) {
                message.success('Policy added successfully!');
                // Optionally, you can perform any other actions upon successful response
            } else {
                message.error('Failed to add policy.');
            }
        } catch (error) {
            console.error('Error adding policy:', error);
            message.error('Failed to add policy.');
        }
    };

    const handleSelectionChange = (value) => {
        setPolicyFor(value);
    };

    const handleMeritTypeChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleBack = () => {
        navigate(-1); // Go back using react-router's navigate
        // You can also perform any other action needed on Back button click
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
                        <Select id="policyFor" placeholder="Select policy type" onChange={handleSelectionChange} value={policyFor}>
                            <Option value="Needbase">Needbase</Option>
                            <Option value="Meritbase">Meritbase</Option>
                        </Select>
                        {policyFor === 'Needbase' && (
                            <>
                                <br/>
                                <label htmlFor="minimumCGPA">Minimum CGPA:</label>
                                <Input id="minimumCGPA" type="text" placeholder="Minimum CGPA" value={val1} onChange={(e) => setVal1(e.target.value)} />
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
                                        <label htmlFor="minimumCGPA">Minimum CGPA:</label>
                                        <Input id="minimumCGPA" type="text" placeholder="Minimum CGPA" value={val1} onChange={(e) => setVal1(e.target.value)} />
                                    </>
                                )}
                                {selectedOption === 'Strength' && (
                                    <> 
                                        <br/>
                                        <label htmlFor="minimumStrength">Minimum Strength:</label>
                                        <Input id="minimumStrength" type="text" placeholder="Minimum Strength" value={val1} onChange={(e) => setVal1(e.target.value)} />
                                        <label htmlFor="maximumStrength">Maximum Strength:</label>
                                        <Input id="maximumStrength" type="text" placeholder="Maximum Strength" value={val2} onChange={(e) => setVal2(e.target.value)} />
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
