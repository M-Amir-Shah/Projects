import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, List, Image, Layout, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    const [isRTrue, setIsRTrue] = useState(false);
    const [isATrue, setIsATrue] = useState(false);
    const [isDocumentsModalVisible, setIsDocumentsModalVisible] = useState(false);

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                const data = localStorage.getItem('selectedApplication');
                if (data) {
                    const parsedData = JSON.parse(data);
                    const sortedDocuments = parsedData.EvidenceDocuments.sort((a, b) => {
                        if (a.document_type === 'salaryslip') return -1;
                        if (b.document_type === 'salaryslip') return 1;
                        return 0;
                    });
                    parsedData.EvidenceDocuments = sortedDocuments;
                    setApplicationData(parsedData);
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

    const handleImagePress = (uri) => {
        setSelectedImageUri(uri);
        setIsImageModalVisible(true);
    };

    const handlePdfPress = (uri) => {
        setSelectedPdfUri(uri);
        setIsPdfModalVisible(true);
    };

    const renderDocumentItem = (item) => {
        if (!item || !item.image) {
            return null;
        }

        const fileExtension = item.image.split('.').pop().toLowerCase();
        let uri;
        switch (item.document_type) {
            case 'salaryslip':
                uri = `${EndPoint.salarySlip}${item.image}`;
                break;
            case 'houseAgreement':
                uri = `${EndPoint.houseAgreement}${item.image}`;
                break;
            case 'deathcertificate':
                uri = `${EndPoint.deathCertificate}${item.image}`;
                break;
            default:
                uri = '';
        }

        if (fileExtension === 'pdf') {
            return (
                <Button type="link" onClick={() => handlePdfPress(uri)}>
                    <img src='./pdf.png' alt='PDF Icon' style={{ width: 50, height: 50 }} />
                </Button>
            );
        } else {
            return (
                <Button type="link" onClick={() => handleImagePress(uri)}>
                    <Image src={uri} alt="Document Image" width={200} />
                </Button>
            );
        }
    };

    const handleReject = async (values) => {
        setIsRTrue(true);
        // Add rejection logic here (API call or other)
        setIsRTrue(false);
    };

    const handleAccept = async (values) => {
        if (!isATrue) {
            setIsATrue(true);
            const { comment, amount } = values;
            try {
                await axios.post(`${EndPoint.giveSuggestion}`, {
                    comment,
                    status: 'Accepted',
                    applicationId: applicationData.applicationId,
                    committeeId: applicationData.committeeId,
                    amount: parseInt(amount, 10),
                });
                message.success('Successfully Submitted!');
            } catch (error) {
                console.error('Error during submission:', error);
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
                <p><strong>Required Amount:</strong> {applicationData.requiredAmount} Rs.</p>
                <p><strong>Reason For Apply:</strong></p>
                <textarea
                    id="suggestion"
                    value={applicationData.reason}
                    readOnly
                    rows="3"
                    cols="97"
                />

                <Button
                    type="primary"
                    style={{ marginTop: '10px' }}
                    onClick={() => setIsDocumentsModalVisible(true)}
                >
                    View Documents
                </Button>

                <Modal
                    title="Documents"
                    visible={isDocumentsModalVisible}
                    footer={null}
                    onCancel={() => setIsDocumentsModalVisible(false)}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={applicationData.EvidenceDocuments}
                        renderItem={(document) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={document.document_type}
                                />
                                {renderDocumentItem(document)}
                            </List.Item>
                        )}
                    />
                </Modal>

                <Modal
                    visible={isImageModalVisible}
                    footer={null}
                    onCancel={() => setIsImageModalVisible(false)}
                >
                    <Image src={selectedImageUri} alt="Full Size Image" style={{ width: '100%' }} />
                </Modal>

                <Modal
                    visible={isPdfModalVisible}
                    footer={null}
                    onCancel={() => setIsPdfModalVisible(false)}
                >
                    <iframe src={selectedPdfUri} style={{ width: '100%', height: '500px' }} />
                </Modal>
                <Row justify="center" gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            danger
                            loading={isRTrue}
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
                                        </Form>
                                    ),
                                    onCancel: () => Modal.destroyAll(),
                                });
                            }}
                        >
                            Reject
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            loading={isATrue}
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Accept Application',
                                    content: (
                                        <Form
                                            onFinish={handleAccept}
                                            layout="vertical"
                                        >
                                            <Form.Item
                                                name="comment"
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
                                        </Form>
                                    ),
                                    onCancel: () => Modal.destroyAll(),
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
