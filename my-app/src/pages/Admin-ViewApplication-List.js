import React, { useState, useEffect } from 'react';
import { Card, Layout, Row, Col, Badge, Button, message } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styling/Committee-DashBoard.css'; // Import your CSS file
import EndPoint from '../endpoints';

const { Header, Content } = Layout;
const { Meta } = Card;

const DocumentCard = ({ document }) => {
    const handleClick = () => {
        message.info(`You clicked on ${document.name}`);
    };

    const getDocumentIcon = (fileName) => {
        if (!fileName) {
            return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon if fileName is undefined or null
        }
    
        const fileType = fileName.split('.').pop().toLowerCase();
        if (fileType === 'pdf') {
            return <FilePdfOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'xls' || fileType === 'xlsx') {
            return <FileExcelOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'jpeg' || fileType === 'png') {
            return <FileImageOutlined style={{ fontSize: '100px' }} />;
        } else {
            return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon for unsupported file types
        }
    };
    

    return (
        <Card
            style={{ width: 300, margin: '20px', cursor: 'pointer' }}
            cover={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>{getDocumentIcon(document.EvidenceDocuments)}</div>}
            onClick={handleClick}
        >
            <Meta title={document.name} />
            <Meta description={`Arid: ${document.arid_no}`} />
        </Card>
    );
};

const App = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${EndPoint.applicationSuggestions}`);
                setDocuments(response.data.map(item => item.re)); // Assuming the API response structure is similar to your previous hard-coded data
            } catch (error) {
                console.error('Error fetching documents:', error);
                message.error('Failed to fetch document data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

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
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Admin-Dashboard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className='content'>
                <div>
                    <Card
                        title="Remaining Application"
                        style={{
                            width: 500,
                            margin: '20px auto',
                        }}
                    >
                        <p className='card-para'>Left<sup><Badge count={documents.length} /></sup></p>
                    </Card>
                    <br />
                    <div className="card-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            documents.map((document, index) => (
                                <DocumentCard key={index} document={document} />
                            ))
                        )}
                    </div>
                </div>
            </Content>
        </div>
    );
};

export default App;