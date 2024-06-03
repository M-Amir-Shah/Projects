import React, { useState } from 'react';
import '../Styling/Add-Student.css';
import { Button, Col, Row, Layout, Input, message, Radio } from 'antd';
import logo from './BiitLogo.jpeg';
import { CameraOutlined, LoadingOutlined, ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EndPoint from '../endpoints';
import { Content } from 'antd/es/layout/layout';

const { Header } = Layout;

const AddStudent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        arid: '',
        semester: '',
        cgpa: '',
        gender: '',
        father: '',
        degree: '',
        section: '',
        password: '',
        pic: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            return;
        }

        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
            return;
        }

        setLoading(true);
        setFormData((prevData) => ({
            ...prevData,
            pic: file
        }));
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            const response = await axios.post(EndPoint.addStudent, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            message.success('Added Successfully');
            navigate('/Admin-Dashboard');
        } catch (error) {
            console.error('Error adding student:', error);
            message.error('Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/Admin-Dashboard');
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#fff' }}>
                        Add Student
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="container">
                <Content className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className="avatar-uploader-container">
                            <label htmlFor="upload-button" className="avatar-uploader">
                                {loading ? (
                                    <LoadingOutlined className="loading-spinner" />
                                ) : formData.pic ? (
                                    <img src={URL.createObjectURL(formData.pic)} alt="avatar" className="avatar-image" />
                                ) : (
                                    <div className="upload-icon">
                                        <CameraOutlined />
                                        <div className="upload-text">Upload</div>
                                    </div>
                                )}
                            </label>
                            <input
                                id="upload-button"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                required
                            />
                        </div>
                        <Input
                            placeholder="Enter Student Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Enter Arid"
                            name="arid"
                            value={formData.arid}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Enter Semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Enter CGPA"
                            name="cgpa"
                            value={formData.cgpa}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Enter section [A,B,C]"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            required
                        />
                        <label>Gender</label>
                        <Radio.Group
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Radio.Group>
                        <Input
                            placeholder="Enter Degree [BSCS, BSSE, BSIT]"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Enter Father Name"
                            name="father"
                            value={formData.father}
                            onChange={handleChange}
                            required
                        />
                        <Input.Password
                            placeholder="Enter Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            required
                        />
                        <div className="RadioButton">
                            <Button type="primary" onClick={handleCancel} size="large">
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" size="large">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default AddStudent;
