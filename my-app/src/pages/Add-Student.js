import React, { useState } from 'react';
import '../Styling/Add-Student.css';
import { Button, Col, Row, Layout, Input, message } from 'antd';
import logo from './BiitLogo.jpeg';
import { SearchOutlined, CameraOutlined, LoadingOutlined, ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EndPoint from '../endpoints';

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
    const [loading, setLoading] = useState(false);
    const [pic, setImageUrl] = useState(null);

    const StudentName = (event) => {
        setName(event.target.value);
    };
    const StudentAird = (event) => {
        setArid(event.target.value);
    };
    const StudentSemester = (event) => {
        setSemester(event.target.value);
    };
    const StudentCgpa = (event) => {
        setCgpa(event.target.value);
    };
    const StudentGender = (event) => {
        setGender(event.target.value);
    };
    const FatherName = (event) => {
        setFather(event.target.value);
    };
    const StudentDegree = (event) => {
        setDegree(event.target.value);
    };
    const StudentSection = (event) => {
        setSection(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    };

    const ImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJpgOrPng) {
            alert('You can only upload JPG/PNG file!');
            return;
        }

        if (!isLt2M) {
            alert('Image must be smaller than 2MB!');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            getBase64(file, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
            });
        }, Math.random() * (5000 - 3000) + 3000); // Random delay between 3s and 5s
    };

    const Submit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('aridno', arid);
        formData.append('semester', semester);
        formData.append('cgpa', cgpa);
        formData.append('gender', gender);
        formData.append('fathername', father);
        formData.append('degree', degree);
        formData.append('section', section);
        formData.append('password', password);
        formData.append('pic', pic);

        axios.post(`${EndPoint.addStudent}`, formData)
            .then(response => {
                message.success('Added Successfully');
                // Clear form fields after successful submission
                setName('');
                setArid('');
                setSemester('');
                setCgpa('');
                setGender('');
                setFather('');
                setDegree('');
                setSection('');
                setPassword('');
                setImageUrl(null);
            })
            .catch(error => {
                message.error('Failed to add student');
                console.error('Error:', error);
            });
    };

    const Cancel = (event) => {
        navigate('/Admin-Dashboard');
    };
    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={Cancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        Add Student
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <form onSubmit={Submit}>
                    <div>
                        <div className="avatar-uploader-container">
                            <label htmlFor="upload-button" className="avatar-uploader">
                                {loading ? (
                                    <LoadingOutlined className="loading-spinner" />
                                ) : pic ? (
                                    <img src={pic} alt="avatar" className="avatar-image" />
                                ) : (
                                    <div className="upload-icon">
                                        <CameraOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </label>
                            <input
                                id="upload-button"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={ImageUpload}
                            />
                        </div>
                        <div className='input-container'>
                            <Input placeholder="Enter Student Name" value={name} onChange={StudentName} required />
                        </div>

                        <div className='input-container'>
                            <Input placeholder="Enter Arid" value={arid} onChange={StudentAird} required />
                        </div>

                        <div className='input-container'>
                            <Input placeholder="Enter Semester" value={semester} onChange={StudentSemester} required />
                        </div>
                        <div className='input-container'>
                            <Input placeholder="Enter CGPA" value={cgpa} onChange={StudentCgpa} required />
                        </div>
                        <div className='input-container'>
                            <Input placeholder="Enter section [A,B,C]" value={section} onChange={StudentSection} required />
                        </div>
                        <label>Gender</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={StudentGender}

                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={StudentGender}
                                />
                                Female
                            </label>
                        </div>
                        <div className='input-container'>
                            <Input placeholder="Enter Degree [BSCS, BSSE, BSIT]" value={degree} onChange={StudentDegree} required />
                        </div>
                        <div className='input-container'>
                            <Input placeholder="Enter Father Name" value={father} onChange={FatherName} required />
                        </div>
                        <div className='input-container'>
                            <Input.Password
                                required
                                placeholder='Enter Password'
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                    </div>
                    <div className='RadioButton'>
                        <Button type="primary" onClick={Cancel} size='large'>Cancel</Button>
                        <Button type="primary" onClick={Submit} size='large'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
