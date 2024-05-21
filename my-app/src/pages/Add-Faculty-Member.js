import React, { useState } from 'react';
import logo from './BiitLogo.jpeg';
import { Layout, Row, Col, Button, Input, message, Upload } from 'antd';
import { ArrowLeftOutlined, CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import "../Styling/Add-Faculty-Member.css";
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const AddFaculty = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const NameSet = (event) => {
        setName(event.target.value);
    };

    const ContactSet = (event) => {
        setContact(event.target.value);
    };

    const PasswordSet = (event) => {
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
            message.error('You can only upload JPG/PNG file!');
            return;
        }

        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
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
        message.success('Added Successfully');
    };

    const Cancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={Cancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Add Faculty Member
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className='container'>
                <Content className="form-box">
                    <form onSubmit={Submit}>
                        <div className="avatar-uploader-container">
                            <label htmlFor="upload-button" className="avatar-uploader">
                                {loading ? (
                                    <LoadingOutlined className="loading-spinner" />
                                ) : imageUrl ? (
                                    <img src={imageUrl} alt="avatar" className="avatar-image" />
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
                            />
                        </div>
                        <div className="form-fields">
                            <label>Name</label>
                            <Input value={name} onChange={NameSet} placeholder="Enter name" />
                            <label>Contact</label>
                            <Input value={contact} onChange={ContactSet} placeholder="Enter contact" />
                            <label>Password</label>
                            <Input.Password value={password} onChange={PasswordSet} placeholder="Enter password" />
                        </div>
                        <div className='buttons'>
                            <Button type="default" onClick={Cancel} size='large' style={{ marginRight: '10px' }}>Cancel</Button>
                            <Button type="primary" htmlType="submit" size='large'>Submit</Button>
                        </div>
                    </form>
                </Content>
            </div>
        </div>
    );
};

export default AddFaculty;
