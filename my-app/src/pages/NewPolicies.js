import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Layout, Row, Col, Button, Radio, Input, Select, Form, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "../Styling/NewPolicies.css";
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints'; // Import the endpoints file
import axios from 'axios';

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const NeedMeritPolicy = () => {
    const history = useNavigate();
    const [selection, setSelection] = useState('');
    const [meritType, setMeritType] = useState('');
    const [form] = Form.useForm(); // Create form instance
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleSelectionChange = (value) => {
        setSelection(value);
        setMeritType(''); // Reset merit type when selection changes
    };

    const handleMeritTypeChange = (e) => {
        setMeritType(e.target.value);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true); // Start loading
        try {
            const formData = new FormData();
            formData.append('description', values.description);
            formData.append('policyFor', values.policyFor);

            // Add other fields based on the policy type
            if (values.policyFor === 'Needbase') {
                formData.append('val1', values.minimumCGPA);
                formData.append('policy', values.description); // Assuming policy description is the same for both types
            } else if (values.policyFor === 'Meritbase') {
                formData.append('val1', values.meritType === 'CGPA' ? values.minimumCGPA : values.minimumStrength);
                formData.append('val2', values.meritType === 'Strength' ? values.maximumStrength : ''); // Assuming val2 is not always used
                formData.append('policy', values.description); // Assuming policy description is the same for both types
                formData.append('strength', values.meritType === 'Strength' ? values.studentsCount : ''); // Assuming strength is only used for 'Strength' type
            }

            const response = await axios.post(EndPoint.addPolicies, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Make sure to set correct content type
                }
            });

            if (response.status === 200) {
                console.log('Policy added successfully');
                form.resetFields();
            } else {
                console.error('Failed to add policy:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding policy:', error);
        } finally {
            setLoading(false);
        }
    };


    const Back = () => {
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
                        Add New Policies
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content>
                    <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                        <Form.Item name="policyFor" label="Policy Type">
                            <Select placeholder="Select policy type" onChange={handleSelectionChange}>
                                <Option value="Needbase">Needbase</Option>
                                <Option value="Meritbase">Meritbase</Option>
                            </Select>
                        </Form.Item>
                        {selection === 'Needbase' && (
                            <>
                                <Form.Item name="minimumCGPA" label="Minimum CGPA" rules={[{ required: true, message: 'Please enter minimum CGPA' }]}>
                                    <Input placeholder="Minimum CGPA" />
                                </Form.Item>
                                <Form.Item name="description" label="Policy Description" rules={[{ required: true, message: 'Please enter policy description' }]}>
                                    <TextArea placeholder="Policy Description" rows={4} />
                                </Form.Item>
                            </>
                        )}
                        {selection === 'Meritbase' && (
                            <>
                                <Form.Item name="meritType" label="Merit Type">
                                    <Radio.Group onChange={handleMeritTypeChange} value={meritType}>
                                        <Radio value="CGPA">CGPA</Radio>
                                        <Radio value="Strength">Strength</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {meritType === 'CGPA' && (
                                    <>
                                        <Form.Item name="minimumCGPA" label="Minimum CGPA" rules={[{ required: true, message: 'Please enter minimum CGPA' }]}>
                                            <Input placeholder="Minimum CGPA" />
                                        </Form.Item>
                                        <Form.Item name="description" label="Policy Description" rules={[{ required: true, message: 'Please enter policy description' }]}>
                                            <TextArea placeholder="Policy Description" rows={4} />
                                        </Form.Item>
                                    </>
                                )}
                                {meritType === 'Strength' && (
                                    <>
                                        <Form.Item name="minimumStrength" label="Minimum Strength" rules={[{ required: true, message: 'Please enter minimum strength' }]}>
                                            <Input placeholder="Minimum Strength" />
                                        </Form.Item>
                                        <Form.Item name="maximumStrength" label="Maximum Strength" rules={[{ required: true, message: 'Please enter maximum strength' }]}>
                                            <Input placeholder="Maximum Strength" />
                                        </Form.Item>
                                        <Form.Item name="studentsCount" label="Students Count">
                                            <Select placeholder="Select number">
                                                <Option value="1">1</Option>
                                                <Option value="2">2</Option>
                                                <Option value="3">3</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="description" label="Policy Description" rules={[{ required: true, message: 'Please enter policy description' }]}>
                                            <TextArea placeholder="Policy Description" rows={4} />
                                        </Form.Item>
                                    </>
                                )}
                            </>
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                            <Button style={{ marginLeft: '8px' }} onClick={() => form.resetFields()}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        </div>
    );
};

export default NeedMeritPolicy;
