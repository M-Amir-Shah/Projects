import "../Styling/View-Application.css"; 
import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from './BiitLogo.jpeg';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Modal, Layout } from 'antd';
import EndPoint from "../endpoints";
const { Header } = Layout;

function App({ id }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [applicationDetails, setApplicationDetails] = useState(null);
  const supportedFormats = ['pdf', 'png', 'jpeg', 'doc']; // Supported file formats

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await fetch(`${EndPoint.getApplication}/${id}`); // Pass id in the URL
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
  }, [id]); // Ensure useEffect runs when id changes

  const showModal = async () => {
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Submit = (event) => {
    event.preventDefault();
    
    console.log('Suggestion submitted:', suggestion);
    setSuggestion(''); // Clear the suggestion box after submission
  };
  
  const Back = () => {
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
            <Button onClick={Back} icon={<ArrowLeftOutlined />} />
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
        <Button onClick={showModal}>View Documents</Button>
        <div>
          <h2>Application Details</h2>
          {applicationDetails && (
            <>
              <p><strong>Name:</strong> {applicationDetails.name}</p>
              <p><strong>ARID:</strong> {applicationDetails.student_id}</p>
              <p><strong>Semester:</strong> {applicationDetails.semester}</p>
              <p><strong>Father Name:</strong> {applicationDetails.father_name}</p>
              <p><strong>Required Amount:</strong> ${applicationDetails.requiredAmount}</p>
            </>
          )}
          <form onSubmit={Submit}>
            <div>
              <label htmlFor="suggestion">Suggestion:</label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                rows="4"
                cols="50"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <Modal
          title="Document Viewer"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          style={{ top: 20 }}
        >
          <div style={{ height: '500px' }}>
            {fileUrl && renderViewer()}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;