import "../Styling/Admin-ViewApplication.css";
import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Row, Modal, Layout, Table, Input, Image, Progress } from 'antd';
import EndPoint from "../endpoints";
import axios from "axios";
const { Header } = Layout;

function App() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [suggestion, setSuggestion] = useState('');
    const [applicationDetails, setApplicationDetails] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [isDataModalVisible, setIsDataModalVisible] = useState(false);
    const [applicationData, setApplicationData] = useState(null); // Define applicationData
    const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false); // Define accept modal state
    const [amount, setAmount] = useState(0); // Define amount
    const supportedFormats = ['pdf', 'png', 'jpeg', 'doc']; // Supported file formats



    const { name, arid_no } = location.state || {};
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
                    setApplicationDetails(parsedData); // Updated state variable
                } else {
                    console.log('No application data found in localStorage');
                }
            } catch (error) {
                console.error('Failed to fetch application data from localStorage', error);
            }
        };

        fetchApplicationData(); // Call the function inside the useEffect
    }, []); // Ensure the dependency array is correct




    const handleImagePress = (uri) => {
        setSelectedImageUri(uri);
        setIsImageModalVisible(true);
    };

    const handleReject = () => {
        Modal.confirm({
            title: 'Reject Application',
            content: 'Are you sure you want to reject this application?',
            onOk: handleRejectConfirmation,
        });
    };

    const handleRejectConfirmation = async () => {
        const applicationId = applicationData?.applicationID;
        if (!applicationId) {
            alert('Application ID is missing');
            return;
        }

        try {
            const response = await axios.post(
                `${EndPoint.rejectApplication}`,
                { applicationid: applicationId, status: 'Rejected' }
            );

            if (response.status === 200) {
                alert('Application rejected successfully!');
                console.log('Application rejected:', response.data);
            } else {
                alert('Failed to reject application');
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Failed to reject application', error);
        }
    };

    const handleAccept = () => {
        setIsAcceptModalVisible(true);
    };

    const handleSaveAmount = async () => {
        try {
            localStorage.setItem('acceptedAmount', amount);
            setIsAcceptModalVisible(false);

            const applicationId = applicationData?.applicationID;
            if (!applicationId) {
                alert('Application ID is missing');
                return;
            }

            const response = await axios.post(
                `${EndPoint.acceptApplication}`,
                { amount, applicationid: applicationId }
            );

            if (response.status === 200) {
                alert('Application accepted successfully!');
                console.log('Amount saved:', response.data);
            } else {
                alert('Failed to accept application');
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Failed to accept application', error);
        }
    };

    const getStatusCounts = () => {
        if (!applicationData || !applicationData.Suggestions) {
            return { accept: 0, reject: 0 };
        }

        const acceptCount = applicationData.Suggestions.filter((item) => item.status === 'Accept').length;
        const rejectCount = applicationData.Suggestions.filter((item) => item.status === 'Reject').length;

        return { accept: acceptCount, reject: rejectCount };
    };

    const { accept, reject } = getStatusCounts();
    const total = accept + reject;
    const pieData = [
        { type: 'Accept', value: accept },
        { type: 'Reject', value: reject },
    ];

    // Function to calculate percentages
    const calculatePercentage = (count, total) => {
        if (total === 0) return 0;  // Prevent division by 0
        return Math.round((count / total) * 100);  // Round to avoid decimal percentages
    };

    // Get count of accepted and rejected suggestions
    const acceptCount = applicationDetails?.Suggestions?.filter((item) => item.status === 'Accepted').length || 0;
    const rejectCount = applicationDetails?.Suggestions?.filter((item) => item.status === 'Rejected').length || 0;

    // Total suggestions count
    const totalSuggestions = acceptCount + rejectCount;

    // Calculate percentages for both statuses
    const acceptPercentage = calculatePercentage(acceptCount, totalSuggestions);
    const rejectPercentage = calculatePercentage(rejectCount, totalSuggestions);


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
            title: 'Committee Member Name',
            dataIndex: 'CommitteeMemberName',  // This matches the field in your data
            key: 'CommitteeMemberName',
        },
        {
            title: 'Status',
            dataIndex: 'status',  // This matches the status field
            key: 'status',
            render: (status) => (
                <span style={{ color: status === 'Accepted' ? 'green' : 'red' }}>
                    {status === 'Accepted' ? 'Accepted' : 'Rejected'}
                </span>
            )
        },
        {
            title: 'Comment',
            dataIndex: 'comment',  // The comment from committee member
            key: 'comment',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',  // Display the amount suggested
            key: 'amount',
            render: (amount) => amount ? `${amount} PKR` : 'N/A',  // Conditional formatting for amount
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
        navigate('/Admin-ViewApplication-List'); // Use navigate function here
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
                        Application Decision Panel
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <div style={{ padding: '20px' }}>
                    <div>
                        <h3>Name: {name}</h3>
                        <h4>Arid No. : {arid_no}</h4>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            {/* Accepted Bar */}
                            <Col span={12}>
                                <h4>Accepted ({acceptCount} / {totalSuggestions})</h4>
                                <Progress percent={acceptPercentage} status="active" strokeColor="green" />
                            </Col>

                            {/* Rejected Bar */}
                            <Col span={12}>
                                <h4>Rejected ({rejectCount} / {totalSuggestions})</h4>
                                <Progress percent={rejectPercentage} status="active" strokeColor="red" />
                            </Col>
                        </Row>
                    </div>

                    <Button type="primary" onClick={() => setIsDataModalVisible(true)} style={{ marginTop: '20px' }}>
                        Show Details
                    </Button>

                    <Table
                        dataSource={applicationDetails?.Suggestions || []}
                        columns={columns}
                        rowKey={(record) => record.$id}  // Ensure each row has a unique key
                        style={{ marginTop: '20px' }}
                    />

                    <Button type="primary" onClick={handleAccept} style={{ margin: '20px 10px 0 0' }}>
                        Accept
                    </Button>
                    <Button type="danger" onClick={handleReject} style={{ margin: '20px 0 0 10px' }}>
                        Reject
                    </Button>

                    <Modal
                        title="Document"
                        visible={isImageModalVisible}
                        onCancel={() => setIsImageModalVisible(false)}
                        footer={null}
                    >
                        <Image src={selectedImageUri} style={{ width: '100%' }} />
                    </Modal>

                    <Modal
                        title="Accept Application"
                        visible={isAcceptModalVisible}
                        onCancel={() => setIsAcceptModalVisible(false)}
                        onOk={handleSaveAmount}
                    >
                        <Input
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                        />
                    </Modal>
                </div>
            </div>

        </div>
    );
}

export default App;
