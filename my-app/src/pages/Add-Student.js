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

    const [name, setName] = useState('');
    const [arid, setArid] = useState('');
    const [semester, setSemester] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [gender, setGender] = useState('');
    const [father, setFather] = useState('');
    const [degree, setDegree] = useState('');
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleArid = (e) => {
        setArid(e.target.value);
    };
    const handleSemester = (e) => {
        setSemester(e.target.value);
    };
    const handleCgpa = (e) => {
        setCgpa(e.target.value);
    };
    const handleGender = (e) => {
        setGender(e.target.value);
    };
    const handleFather = (e) => {
        setFather(e.target.value);
    };
    const handleDegree = (e) => {
        setDegree(e.target.value);
    };
    const handleSection = (e) => {
        setSection(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const ImageUpload = (event) => {
        const file = event.target.files[0];
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
        setPic(file);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('cgpa', cgpa);
            data.append('semester', semester);
            data.append('aridno', arid);
            data.append('gender', gender);
            data.append('fathername', father);
            data.append('degree', degree);
            data.append('section', section);
            data.append('password', password);
            data.append('pic', pic);
    
            const response = await axios.post(EndPoint.addStudent, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response data:', response.data);  // Log full response
            message.success('Add Successfully');
            navigate('/Admin-Dashboard');
        } catch (error) {
            console.error('Error adding student:', error.response ? error.response.data : error.message);  // Log error response
            message.error('Failed to add student');
        } finally {
            setLoading(false);
        }
    };
    
    const handleCancel = () => {
        navigate('/Student-Record');
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#fff' }}>
                        Add New Student
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
                                ) : pic ? (
                                    <img src={URL.createObjectURL(pic)} alt="avatar" className="avatar-image" />
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
                                onChange={ImageUpload}
                                required
                            />
                        </div>
                        <Input
                            placeholder="Enter Student Name"
                            name="name"
                            value={name}
                            onChange={handleName}
                            required
                        />
                        <Input
                            placeholder="Enter Arid"
                            name="arid"
                            value={arid}
                            onChange={handleArid}
                            pattern="\d{4}-Arid-\d{4}"
                            title="Please enter in the format: 2020-Arid-1234"
                            required
                        />
                        <Input
                            placeholder="Enter Semester"
                            name="semester"
                            value={semester}
                            onChange={handleSemester}
                            required
                        />
                        <Input
                            placeholder="Enter CGPA"
                            name="cgpa"
                            value={cgpa}
                            onChange={handleCgpa}
                            required
                        />
                        <Input
                            placeholder="Enter section [A,B,C]"
                            name="section"
                            value={section}
                            onChange={handleSection}
                            required
                        />
                        <label>Gender</label>
                        <Radio.Group
                            name="gender"
                            value={gender}
                            onChange={handleGender}
                            required
                        >
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                        </Radio.Group>
                        <Input
                            placeholder="Enter Degree [BSCS, BSSE, BSIT]"
                            name="degree"
                            value={degree}
                            onChange={handleDegree}
                            required
                        />
                        <Input
                            placeholder="Enter Father Name"
                            name="father"
                            value={father}
                            onChange={handleFather}
                            required
                        />
                        <Input.Password
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            required
                        />
                        <div className="RadioButton">
                            <Button type="primary" onClick={handleCancel} size="large">
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" size="large">
                                Add
                            </Button>
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default AddStudent;
