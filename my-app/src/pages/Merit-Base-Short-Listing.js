// import React, { useState, useEffect } from 'react';
// import '../Styling/MeritBase-ShortListing.css';
// import { Button, List, Col, Row, Layout, Avatar, message } from 'antd';
// import { ArrowLeftOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import EndPoint from '../endpoints';
// import logo from './BiitLogo.jpeg';
// const { Header } = Layout;

// const fetchStudentRecords = async () => {
//     try {
//         const response = await fetch(EndPoint.meritBaseShortListing);
        
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching student records:', error);
//         message.error('Failed to load student records.');
//         return [];
//     }
// };

// const StudentRecords = () => {
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadStudentRecords = async () => {
//             setLoading(true);
//             const data = await fetchStudentRecords();
//             setApplications(data);
//             setLoading(false);
//         };

//         loadStudentRecords();
//     }, []);

//     const Back = () => {
//         navigate('/Admin-Dashboard'); // Use navigate function here
//     };

//     const Submit = (event) => {
//         event.preventDefault();
//     };

//     return (
//         <div className="container">
//             <Header className="navbar">
//                 <Row justify="space-between" align="middle">
//                     <Col>
//                         <Button onClick={Back} icon={<ArrowLeftOutlined />} />
//                     </Col>
//                     <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
//                         BIIT Meritbase-Student Records
//                     </Col>
//                     <Col>
//                         <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
//                     </Col>
//                 </Row>
//             </Header>
//             <div className="form-box">
//                 <h2 style={{ textAlign: 'center' }}>Short listed Records</h2>
//                 <form onSubmit={Submit}>
//                     <div className="scrollable-list">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             <List
//                                 itemLayout="horizontal"
//                                 dataSource={applications}
//                                 renderItem={item => (
//                                     <List.Item>
//                                         <List.Item.Meta
//                                             avatar={<Avatar size={64} icon={<UserOutlined />} />}
//                                             title={item.name}
//                                             description={item.arid_no}
//                                         />
//                                     </List.Item>
//                                 )}
//                             />
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default StudentRecords;


// const removeMember = (id) => {
//     setMembers(members.filter((member) => member.id !== id));
// };

// <List.Item
//     actions={[
//         <button type='primary' onClick={() => removeMember(item.id)}>Remove</button>
//     ]}
// >
//     <List.Item.Meta
//         title={<a href="https://ant.design">{item.name}</a>}
//     />
// </List.Item>











import React, { useState, useEffect } from 'react';
import '../Styling/MeritBase-ShortListing.css';
import { Button, List, Col, Row, Layout, Avatar, message, Upload } from 'antd';
import { ArrowLeftOutlined, UserOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EndPoint from '../endpoints';
import logo from './BiitLogo.jpeg';
const { Header } = Layout;

const fetchStudentRecords = async () => {
    try {
        const response = await fetch(EndPoint.meritBaseShortListing);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Response : ',response);
        console.log(EndPoint.meritBaseShortListing);
        return data;
    } catch (error) {
        console.error('Error fetching student records:', error);
        message.error('Failed to load student records.');
        return [];
    }
};

const uploadExcelFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(EndPoint.uploadfile, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        message.success('File uploaded successfully.');
        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        message.error('Failed to upload file.');
    }
};

const StudentRecords = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const loadStudentRecords = async () => {
            setLoading(true);
            const data = await fetchStudentRecords();
            setApplications(data);
            setLoading(false);
        };

        loadStudentRecords();
    }, []);

    const Back = () => {
        navigate('/Admin-Dashboard');
    };

    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            setFile(info.file.originFileObj);
        }
    };

    const handleUpload = async () => {
        if (file) {
            await uploadExcelFile(file);
        } else {
            message.error('Please select a file first.');
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
                        BIIT Meritbase-Student Records
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="form-box">
                <h2 style={{ textAlign: 'center' }}>Short listed Records</h2>
                <div className="scrollable-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : applications.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={applications}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                        title={item.name}
                                        description={item.arid_no}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <>
                            <p>No records found. Please upload a file.</p>
                            <Upload 
                                onChange={handleFileChange}
                                showUploadList={false}
                                accept=".xlsx, .xls"
                                beforeUpload={() => false}
                            >
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                            <Button 
                                type="primary"
                                icon={<PlusOutlined />} 
                                onClick={handleUpload} 
                                style={{ marginTop: 16 }}
                            >
                                Upload File
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentRecords;
