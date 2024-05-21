import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Card, Modal, Upload, message, Image, Table } from 'antd';
import { UploadOutlined, FilePdfOutlined, FileImageOutlined, FileExcelOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileError, setFileError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [excelData, setExcelData] = useState([]);

  const allowedFiles = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  const handleFile = (file) => {
    if (file) {
      if (allowedFiles.includes(file.type)) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          setFileError('');
          setFile(e.target.result);
          setFileType(file.type);
          if (file.type.includes('spreadsheetml') || file.type.includes('excel')) {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            setExcelData(worksheet);
          }
          message.success(`${file.name} file uploaded successfully.`);
        };
        if (file.type.includes('spreadsheetml') || file.type.includes('excel')) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsDataURL(file);
        }
      } else {
        setFileError('Not a valid file type: Please select PDF, Image, or Excel file');
        setFile('');
        message.error(`${file.name} is not a valid file type.`);
      }
    } else {
      console.log('please select a file');
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      handleFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setFile(null);
      setFileType('');
      setExcelData([]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderFileIcon = () => {
    switch (fileType) {
      case 'application/pdf':
        return <FilePdfOutlined style={{ fontSize: '32px', color: '#1890ff' }} />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <FileImageOutlined style={{ fontSize: '32px', color: '#1890ff' }} />;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return <FileExcelOutlined style={{ fontSize: '32px', color: '#1890ff' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <Card title="Upload File" bordered={false}>
        <Dragger {...uploadProps} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for PDF, Image, and Excel files.</p>
        </Dragger>
        {fileError && <span className='text-danger'>{fileError}</span>}
      </Card>

      {file && (
        <Card
          title="View File"
          bordered={false}
          style={{ marginTop: '20px' }}
          hoverable
          onClick={showModal}
        >
          {renderFileIcon()}
          <p>Click to view the file</p>
        </Card>
      )}

      <Modal
        title="File Viewer"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        {fileType === 'application/pdf' && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        )}
        {(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') && (
          <Image src={file} alt="uploaded image" style={{ width: '100%' }} preview={true} />
        )}
        {(fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') && (
          <Table dataSource={excelData.slice(1).map((row, index) => ({
            key: index,
            ...row.reduce((acc, cell, i) => ({ ...acc, [excelData[0][i]]: cell }), {})
          }))} columns={excelData[0].map((title, index) => ({
            title,
            dataIndex: title,
            key: index,
          }))} pagination={false} />
        )}
      </Modal>
    </div>
  );
}

export default App;
