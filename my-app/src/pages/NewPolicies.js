import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Layout, Row, Col, Button, Radio, Input, Select, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "../Styling/NewPolicies.css";

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const NeedMeritPolicy = () => {
    const [selection, setSelection] = useState('');
    const [meritType, setMeritType] = useState('');

    const handleSelectionChange = (value) => {
        setSelection(value);
        setMeritType(''); // Reset merit type when selection changes
    };

    const handleMeritTypeChange = (e) => {
        setMeritType(e.target.value);
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} />
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
                    <Form layout="vertical">
                        <Form.Item label="Policy Type">
                            <Select placeholder="Select policy type" onChange={handleSelectionChange}>
                                <Option value="Needbase">Needbase</Option>
                                <Option value="Meritbase">Meritbase</Option>
                            </Select>
                        </Form.Item>
                        {selection === 'Needbase' && (
                            <>
                                <Form.Item label="Minimum CGPA">
                                    <Input placeholder="Minimum CGPA" />
                                </Form.Item>
                                <Form.Item label="Policy Description">
                                    <TextArea placeholder="Policy Description" rows={4} />
                                </Form.Item>
                            </>
                        )}
                        {selection === 'Meritbase' && (
                            <>
                                <Form.Item>
                                    <Radio.Group onChange={handleMeritTypeChange} value={meritType}>
                                        <Radio value="CGPA">CGPA</Radio>
                                        <Radio value="Strength">Strength</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {meritType === 'CGPA' && (
                                    <>
                                        <Form.Item label="Minimum CGPA">
                                            <Input placeholder="Minimum CGPA" />
                                        </Form.Item>
                                        <Form.Item label="Policy Description">
                                            <TextArea placeholder="Policy Description" rows={4} />
                                        </Form.Item>
                                    </>
                                )}
                                {meritType === 'Strength' && (
                                    <>
                                        <Form.Item label="Minimum Strength">
                                            <Input placeholder="Minimum Strength" />
                                        </Form.Item>
                                        <Form.Item label="Maximum Strength">
                                            <Input placeholder="Maximum Strength" />
                                        </Form.Item>
                                        <Form.Item label="Student will get">
                                            <Select placeholder="Select number">
                                                <Option value="1">1</Option>
                                                <Option value="2">2</Option>
                                                <Option value="3">3</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Policy Description">
                                            <TextArea placeholder="Policy Description" rows={4} />
                                        </Form.Item>
                                    </>
                                )}
                            </>
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button style={{ marginLeft: '8px' }}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        </div>
    );
};

export default NeedMeritPolicy;
