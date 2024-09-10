import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, List, Image, Layout, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import logo from './BiitLogo.jpeg';
import '../Styling/View-Application.css';
import EndPoint from '../endpoints';

const { Header } = Layout;

const ViewApplication = () => {
    const navigate = useNavigate();
    const [applicationData, setApplicationData] = useState(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState('');
    const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
    const [selectedPdfUri, setSelectedPdfUri] = useState('');
    const [visibleCommentId, setVisibleCommentId] = useState(null);
    const [suggestion, setSuggestion] = useState('');

    const [house, setHouse] = useState(null);
    const [salary, setSalary] = useState(null);
    const [death, setDeath] = useState(null);
    const [isRTrue, setIsRTrue] = useState(false); // For Reject loading state
    const [isATrue, setIsATrue] = useState(false); // For Accept loading state

    const fetchHouseAgreement = async () => {
        try {
            const response = await fetch(`${EndPoint.houseAgreement}`);
            const data = await response.json();
            setHouse(data);
        } catch (error) {
            console.error('Failed to fetch data.', error);
        }
    };

    const fetchSalarySlip = async () => {
        try {
            const response = await fetch(`${EndPoint.salarySlip}`);
            const data = await response.json();
            setSalary(data);
        } catch (error) {
            console.error('Failed to fetch data.', error);
        }
    };

    const fetchDeathCertificate = async () => {
        try {
            const response = await fetch(`${EndPoint.deathCertificate}`);
            const data = await response.json();
            setDeath(data);
        } catch (error) {
            console.error('Failed to fetch data.', error);
        }
    };

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                const data = localStorage.getItem('selectedApplication');
                if (data) {
                    const parsedData = JSON.parse(data);
                    console.log('Fetched application data:', parsedData);

                    const sortedDocuments = parsedData.EvidenceDocuments.sort((a, b) => {
                        if (a.document_type === 'salaryslip') return -1;
                        if (b.document_type === 'salaryslip') return 1;
                        return 0;
                    });

                    parsedData.EvidenceDocuments = sortedDocuments;
                    setApplicationData(parsedData);
                } else {
                    console.log('No application data found in localStorage');
                }
            } catch (error) {
                console.error('Failed to fetch application data from localStorage', error);
            }
        };

        fetchApplicationData();
    }, []);

    const handleBack = () => {
        navigate('/Committee-Dashboard');
    };

    const handleImageClick = () => {
        setSelectedImageUri(fetchDeathCertificate);
        setIsImageModalVisible(true);
    };

    const handleImageModalClose = () => {
        setIsImageModalVisible(false);
        setSelectedImageUri('');
    };

    const handlePdfClick = () => {
        setSelectedPdfUri(fetchDeathCertificate);
        setIsPdfModalVisible(true);
    };

    const handlePdfModalClose = () => {
        setIsPdfModalVisible(false);
        setSelectedPdfUri('');
    };

    const Submit = (event) => {
        event.preventDefault();
        console.log('Suggestion submitted:', suggestion);
        setSuggestion(''); // Clear the suggestion box after submission
    };

    const toggleCommentVisibility = (id) => {
        setVisibleCommentId(visibleCommentId === id ? null : id);
    };

    const handleReject = async (values) => {
        setIsRTrue(true);
        // Handle rejection logic here
        setIsRTrue(false);
    };

    const handleAccept = async (values) => {
        if (!isATrue) {
            setIsATrue(true);
            const { comment, committeeId } = values;
            try {
                const response = await axios.post(`${EndPoint.giveSuggestion}`, {
                    comment,
                    status: 'Accepted',
                    applicationId: applicationData.applicationId,
                    committeeId
                });
                message.success('Successfully Submitted!');
                console.log(response.data);
            } catch (error) {
                console.error(error);
                message.error('Error, try again later');
            }
            setIsATrue(false);
        }
    };
    

    if (!applicationData) {
        return <div>Loading...</div>;
    }

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
                <h2 className='h2'>View Application</h2>
                <p><strong>Name:</strong> {applicationData.name}</p>
                <p><strong>ARID:</strong> {applicationData.arid_no}</p>
                <p><strong>Semester:</strong> {applicationData.semester}<sup>th</sup></p>
                <p><strong>Father Name:</strong> {applicationData.father_name}</p>
                <p><strong>Father Status:</strong> {applicationData.father_status}</p>
                <p><strong>Required Amount:</strong> ${applicationData.requiredAmount}</p>
                <p><strong>Reason For Apply:</strong></p>
                <textarea
                    id="suggestion"
                    value={applicationData.reason}
                    readOnly
                    rows="3"
                    cols="97"
                />

                <List
                    itemLayout="horizontal"
                    dataSource={applicationData.EvidenceDocuments}
                    renderItem={(document) => (
                        <List.Item>
                            <List.Item.Meta
                                title={document.document_type}
                            />
                            {document.file_name && document.file_name.endsWith('.pdf') ? (
                                <Button onClick={() => handlePdfClick(document.document_uri)}>View PDF</Button>
                            ) : (
                                <Button onClick={() => handleImageClick(document.document_uri)}>View Documents</Button>
                            )}
                        </List.Item>
                    )}
                />
                <Modal
                    open={isImageModalVisible}
                    onCancel={handleImageModalClose}
                    footer={null}
                >
                    <Image src={selectedImageUri} alt="Document" />
                </Modal>
                <Modal
                    open={isPdfModalVisible}
                    onCancel={handlePdfModalClose}
                    footer={null}
                >
                    <iframe src={selectedPdfUri} title="PDF Viewer" width="100%" height="500px" />
                </Modal>
                <Row justify="center" gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Reject Application',
                                    content: (
                                        <Form
                                            onFinish={handleReject}
                                            layout="vertical"
                                        >
                                            <Form.Item
                                                name="reason"
                                                label="Reason for Rejection"
                                                rules={[{ required: true, message: 'Enter reason for rejection' }]}
                                            >
                                                <Input.TextArea rows={4} />
                                            </Form.Item>
                                            <Form.Item>
                                                <Row justify="end">
                                                    <Button type="default" onClick={() => Modal.destroyAll()}>Cancel</Button>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={isRTrue}
                                                        style={{ marginLeft: '8px' }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </Row>
                                            </Form.Item>
                                        </Form>
                                    ),
                                    onCancel: () => Modal.destroyAll()
                                });
                            }}
                        >
                            Reject
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Accept Application',
                                    content: (
                                        <Form
                                            onFinish={handleAccept}
                                            layout="vertical"
                                        >
                                            <Form.Item
                                                name="reason"
                                                label="Reason for Acceptance"
                                                rules={[{ required: true, message: 'Enter reason for acceptance' }]}
                                            >
                                                <Input.TextArea rows={4} />
                                            </Form.Item>
                                            <Form.Item
                                                name="amount"
                                                label="Scholarship Amount"
                                                rules={[{ required: true, message: 'Enter scholarship amount' }]}
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item>
                                                <Row justify="end">
                                                    <Button type="default" onClick={() => Modal.destroyAll()}>Cancel</Button>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={isATrue}
                                                        style={{ marginLeft: '8px' }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </Row>
                                            </Form.Item>
                                        </Form>
                                    ),
                                    onCancel: () => Modal.destroyAll()
                                });
                            }}
                        >
                            Accept
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ViewApplication;
