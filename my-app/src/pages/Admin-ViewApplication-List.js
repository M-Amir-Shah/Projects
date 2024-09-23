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
    const navigate = useNavigate();

    const handleClick = () => {
        // Save document to localStorage or pass necessary details in the state
        localStorage.setItem('selectedApplication', JSON.stringify(document));

        // Navigate to the Admin-ViewApplication with the required state (name, arid_no)
        navigate('/Admin-ViewApplication', { 
            state: { 
                name: document.name, 
                arid_no: document.arid_no 
            } 
        });
    };

    const getDocumentIcon = (fileName) => {
        if (typeof fileName !== 'string') {
            console.error(`Expected a string for fileName but got ${typeof fileName}`);
            return <FileImageOutlined style={{ fontSize: '100px' }} />;
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
            cover={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    {getDocumentIcon(document.EvidenceDocuments)}
                </div>
            }
            onClick={handleClick}
        >
            <Meta
                title={document.name} 
                description={<p>{document.arid_no}</p>}
            />
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
                setDocuments(response.data);
                console.log("Response : ", response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
                message.error('Failed to fetch documents data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [id]);

    const handleCancel = () => {
        navigate('/Admin-Dashboard');
    };

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handleCancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Admin-Dashboard
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <Content className='container'>
                <div>
                    <Card
                        title="Remaining Application"
                        style={{
                            width: 500,
                            margin: '20px auto',
                        }}
                    >
                        <p className='card-para'>Left <sup><Badge count={documents.length} /></sup></p>
                    </Card>
                    <br />
                    <div className="scrollable-container">
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
