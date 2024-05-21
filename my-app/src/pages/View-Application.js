import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Card, Modal, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const allowedFiles = ['application/pdf'];
  const handleFile = (file) => {
    if (file) {
      if (allowedFiles.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
          message.success(`${file.name} file uploaded successfully.`);
        };
      } else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
        message.error(`${file.name} is not a valid pdf.`);
      }
    } else {
      console.log('please select a PDF');
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      handleFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setPdfFile(null);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <Card title="Upload PDF" bordered={false}>
        <Dragger {...uploadProps} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag PDF file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single PDF file only.</p>
        </Dragger>
        {pdfError && <span className='text-danger'>{pdfError}</span>}
      </Card>

      {pdfFile && (
        <Card
          title="View PDF"
          bordered={false}
          style={{ marginTop: '20px' }}
          hoverable
          onClick={showModal}
        >
          Click to view the PDF
        </Card>
      )}

      <Modal
        title="PDF Viewer"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        )}
      </Modal>
    </div>
  );
}

export default App;
