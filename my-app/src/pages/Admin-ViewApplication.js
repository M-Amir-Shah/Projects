import "../Styling/Admin-ViewApplication.css";
import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Modal, Layout, Table, Progress } from 'antd';
import EndPoint from "../endpoints";
const { Header } = Layout;

function App() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [suggestion, setSuggestion] = useState('');
    const [applicationDetails, setApplicationDetails] = useState(null);
    const supportedFormats = ['pdf', 'png', 'jpeg', 'doc']; // Supported file formats

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await fetch(`${EndPoint.getApplication}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch application details');
                }
                const data = await response.json();
                setApplicationDetails(data);
            } catch (error) {
                console.error('Error fetching application details:', error);
            }
        };

        fetchApplicationDetails();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/teachers'); // Replace with your API endpoint
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const acceptedCount = teachers.filter(teacher => teacher.status === 'Accepted').length;
    const rejectedCount = teachers.filter(teacher => teacher.status === 'Rejected').length;
    const totalCount = teachers.length;

    const acceptedPercentage = totalCount ? ((acceptedCount / totalCount) * 100).toFixed(2) : 0;
    const rejectedPercentage = totalCount ? ((rejectedCount / totalCount) * 100).toFixed(2) : 0;

    const showModal = (reason) => {
        setModalContent(reason);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Teacher Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{ color: status === 'Accepted' ? 'green' : 'red' }}>
                    {status}
                </span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => showModal(record.reason)}>
                    View
                </Button>
            )
        }
    ];

    const openDocumentModal = async () => {
        const selectedFormat = await getFileFormat(); // Prompt user to select a file
        if (selectedFormat) {
            setFileType(selectedFormat);
            setIsModalVisible(true);
        }
    };

    const getFileFormat = async () => {
        // Simulate user selecting a file format
        return new Promise((resolve) => {
            // In a real application, you might show a file picker dialog or implement some other way for the user to select a file
            // For this example, we'll randomly select a file format from the supported formats
            const randomIndex = Math.floor(Math.random() * supportedFormats.length);
            resolve(supportedFormats[randomIndex]);
        });
    };

    const handleDocumentModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Suggestion submitted:', suggestion);
        setSuggestion(''); // Clear the suggestion box after submission
    };

    const handleBack = () => {
        navigate('/Committee-Dashboard'); // Use navigate function here
    };

    const renderViewer = () => {
        switch (fileType) {
            case 'pdf':
                return (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl={fileUrl}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                );
            case 'doc':
                return <iframe src={fileUrl} title="Document Viewer" style={{ width: '100%', height: '100%' }} />;
            case 'png':
            case 'jpeg':
                return <img src={fileUrl} alt="Image Viewer" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Accepted</h3>
                        <Progress
                            percent={parseFloat(acceptedPercentage)}
                            strokeColor="green"
                            trailColor="#d9d9d9"
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Rejected</h3>
                        <Progress
                            percent={parseFloat(rejectedPercentage)}
                            strokeColor="red"
                            trailColor="#d9d9d9"
                        />
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <Table columns={columns} dataSource={teachers} pagination={false} />
                    </div>
                    <Modal title="Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{modalContent}</p>
                    </Modal>
                </div>
                <Button onClick={openDocumentModal}>View Documents</Button>
                <div>
                      
                </div>
                <Modal
                    title="Document Viewer"
                    visible={isModalVisible}
                    onCancel={handleDocumentModalCancel}
                    footer={null}
                    width="80%"
                    style={{ top: 20 }}
                >
                    <div style={{ height: '500px' }}>
                        {fileUrl && renderViewer()}
                    </div>
                </Modal>
                <br/>
                <Button type="primary" onClick={openDocumentModal}>Accepted</Button>
                <Button type="primary" onClick={openDocumentModal}>Rejected</Button>
            </div>
            
        </div>
    );
}

export default App;
