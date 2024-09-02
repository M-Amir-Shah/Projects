import React, { useEffect, useState } from 'react';
import { List, Modal, Button, Image, Typography } from 'antd';
import localforage from 'localforage'; // Install this or use localStorage
import EndPoint from '../endpoints'; // Replace with the appropriate base URL configuration

const { Text } = Typography;

const ViewApplication = () => {
    const [applicationData, setApplicationData] = useState(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState('');
    const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
    const [selectedPdfUri, setSelectedPdfUri] = useState('');
    const [visibleCommentId, setVisibleCommentId] = useState(null);

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                const data = await localforage.getItem('selectedApplication');
                if (data !== null) {
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
                console.error('Failed to fetch application data', error);
            }
        };

        fetchApplicationData();
    }, []);

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
        if (item.document_type === 'salaryslip') {
            uri = `${EndPoint}/Backend/Content/SalarySlip/${item.image}`;
        } else if (item.document_type === 'houseAgreement') {
            uri = `${EndPoint}/Backend/Content/HouseAgreement/${item.image}`;
        }
        else if (item.document_type === 'deathcertificate') {
            uri = `${EndPoint}/Backend/Content/DeathCertificates/${item.image}`;
        }

        if (fileExtension === 'pdf') {
            return (
                <Button type="link" onClick={() => handlePdfPress(uri)}>
                    <img src="pdf.png" alt="PDF Icon" style={{ width: 50, height: 50 }} />
                </Button>
            );
        } else {
            return (
                <Button type="link" onClick={() => handleImagePress(uri)}>
                    <img src={uri} alt="Document Image" style={{ width: 50, height: 50 }} />
                </Button>
            );
        }
    };

    const renderSuggestionItem = (item) => (
        <List.Item>
            <Text strong>Committee Member Name:</Text> {item.CommitteeMemberName}
            <br />
            <Text strong>Status:</Text> {item.status}
            {visibleCommentId === item.$id && (
                <>
                    <br />
                    <Text strong>Comment:</Text> {item.comment}
                </>
            )}
            <Button type="link" onClick={() => setVisibleCommentId(visibleCommentId === item.$id ? null : item.$id)}>
                {visibleCommentId === item.$id ? 'Hide Comment' : 'View Comment'}
            </Button>
        </List.Item>
    );

    return (
        <div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={applicationData ? applicationData.EvidenceDocuments : []}
                renderItem={renderDocumentItem}
            />

            {applicationData && (
                <div>
                    <Text strong>Name:</Text> {applicationData.name}
                    <br />
                    <Text strong>Arid No:</Text> {applicationData.arid_no}
                    <br />
                    <Text strong>Father Name:</Text> {applicationData.father_name}
                    <br />
                    <Text strong>Father Status:</Text> {applicationData.father_status}
                    <br />
                    <Text strong>Required Amount:</Text> {applicationData.requiredAmount}
                    <br />
                    <Text strong>Reasons:</Text> {applicationData.reason}
                </div>
            )}

            {applicationData && (
                <List
                    dataSource={applicationData.Suggestions}
                    renderItem={renderSuggestionItem}
                />
            )}

            <Modal
                title="Document Image"
                visible={isImageModalVisible}
                footer={null}
                onCancel={() => setIsImageModalVisible(false)}
            >
                <img src={selectedImageUri} alt="Selected Document" style={{ width: '100%' }} />
            </Modal>

            <Modal
                title="PDF Viewer"
                visible={isPdfModalVisible}
                footer={null}
                onCancel={() => setIsPdfModalVisible(false)}
            >
                <iframe src={selectedPdfUri} style={{ width: '100%', height: '500px' }} />
            </Modal>
        </div>
    );
};

export default ViewApplication;
