import React, { useState, useEffect } from 'react';
import { Card, Layout, Row, Col, Badge, Drawer, Button, Avatar, message } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
import '../Styling/Committee-DashBoard.css';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import Search from '../components/SearchingButton';
import EndPoint from '../endpoints'; // Import your API endpoints file

const { Header, Content } = Layout;
const { Meta } = Card;

const DocumentCard = ({ document }) => {
    const handleClick = () => {
        message.info(`You clicked on ${document.name}`);
    };

    const getDocumentIcon = (fileName) => {
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
            <Meta description={`CGPA: ${document.cgpa}, Required Amount: ${document.requiredAmount}`} />
        </Card>
    );
};

const App = () => {
    const navigate = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${EndPoint.getApplication}?id=YOUR_COMMITTEE_ID`); // Replace with your actual committee ID
                if (!response.ok) {
                    throw new Error('Failed to fetch documents data');
                }
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
                // message.error('Failed to fetch documents data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const Logout = () => {
        navigate('/Login');
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const BalanceCheck = async () => {
        try {
            const response = await fetch(EndPoint.getBalance);
            if (!response.ok) {
                throw new Error('Failed to fetch balance data');
            }
            const money = await response.json();
            message.success(`Remaining Balance is: ${money.remainingAmount}`);
        } catch (error) {

            message.error('Failed to fetch balance data.');
        }
    };
    

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <div style={{ padding: "5px" }}>
                            <Button icon={<BarsOutlined />} onClick={showDrawer} />
                        </div>
                        <Drawer
                            placement="left"
                            width={300}
                            closable={true}
                            onClose={onClose}
                            visible={isDrawerVisible}
                            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <div className="sider-content">
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <br />
                            <Button type="primary" onClick={BalanceCheck} style={{ width: '80%' }}>Remaining Amount</Button>
                            <br />
                            <Button type="primary" onClick={Logout} style={{ width: '80%' }}>Logout</Button>
                        </Drawer>
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        BIIT Committee-DashBoard
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
                    <Search placeholder="Search" />
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


// import React, { useState, useEffect } from 'react';
// import { Card, Layout, Row, Col, Badge, Drawer, Button, Avatar, message } from 'antd';
// import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons';
// import '../Styling/Committee-DashBoard.css';
// import { useNavigate } from "react-router-dom";
// import logo from './BiitLogo.jpeg';
// import Search from '../components/SearchingButton';
// // import EndPoint from '../endpoints'; // Import your API endpoints file

// const { Header, Content } = Layout;
// const { Meta } = Card;

// const DocumentCard = ({ document }) => {
//     const handleClick = () => {
//         message.info(`You clicked on ${document.name}`);
//     };

//     const getDocumentIcon = (fileName) => {
//         const fileType = fileName.split('.').pop().toLowerCase();
//         if (fileType === 'pdf') {
//             return <FilePdfOutlined style={{ fontSize: '100px' }} />;
//         } else if (fileType === 'xls' || fileType === 'xlsx') {
//             return <FileExcelOutlined style={{ fontSize: '100px' }} />;
//         } else if (fileType === 'jpeg' || fileType === 'png') {
//             return <FileImageOutlined style={{ fontSize: '100px' }} />;
//         } else {
//             return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon for unsupported file types
//         }
//     };

//     return (
//         <Card
//             style={{ width: 300, margin: '20px', cursor: 'pointer' }}
//             cover={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>{getDocumentIcon(document.EvidenceDocuments)}</div>}
//             onClick={handleClick}
//         >
//             <Meta title={document.name} />
//             <Meta description={`${document.Arid}`} />
//         </Card>
//     );
// };

// const App = () => {
//     const navigate = useNavigate();
//     const [isDrawerVisible, setIsDrawerVisible] = useState(false);
//     const [documents, setDocuments] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const dummyData = [
//             { name: 'Muhammad Amir', EvidenceDocuments: 'file1.pdf', Arid: '2020-Arid-3690' },
//             { name: 'Usman Akbar', EvidenceDocuments: 'file2.xlsx', Arid: '2020-Arid-4236' },
//             { name: 'Muhammad Bashir', EvidenceDocuments: 'file3.jpeg', Arid: '2020-Arid-3699' },
//             { name: 'M Abdul Islam', EvidenceDocuments: 'file1.pdf', Arid: '2020-Arid-3677' },
//             { name: 'Usman Akbar', EvidenceDocuments: 'file2.xlsx', Arid: '2020-Arid-4236' },
//             { name: 'Muhammad Bashir', EvidenceDocuments: 'file3.jpeg', Arid: '2020-Arid-3699' },
//             { name: 'Muhammad Amir', EvidenceDocuments: 'file1.pdf', Arid: '2020-Arid-3690' },
//             { name: 'Usman Akbar', EvidenceDocuments: 'file2.xlsx', Arid: '2020-Arid-4236' },
//             { name: 'Muhammad Bashir', EvidenceDocuments: 'file3.jpeg', Arid: '2020-Arid-3699' },
//         ];
        
//         setLoading(true);
//         setTimeout(() => {
//             setDocuments(dummyData);
//             setLoading(false);
//         }, 1000); // Simulating network delay
//     }, []);

//     const Logout = () => {
//         navigate('/Login');
//     };

//     const showDrawer = () => {
//         setIsDrawerVisible(true);
//     };

//     const onClose = () => {
//         setIsDrawerVisible(false);
//     };

//     const BalanceCheck = async () => {
//         // Dummy balance check
//         const money = { remainingAmount: 5000 };
//         message.success(`Remaining Balance is: ${money.remainingAmount}`);
//     };

//     return (
//         <div>
//             <Header className="navbar">
//                 <Row justify="space-between" align="middle">
//                     <Col>
//                         <div style={{ padding: "5px" }}>
//                             <Button icon={<BarsOutlined />} onClick={showDrawer} />
//                         </div>
//                         <Drawer
//                             placement="left"
//                             width={300}
//                             closable={true}
//                             onClose={onClose}
//                             visible={isDrawerVisible}
//                             bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//                         >
//                             <div className="sider-content">
//                                 <Avatar size={64} icon={<UserOutlined />} />
//                             </div>
//                             <br />
//                             <Button type="primary" onClick={BalanceCheck} style={{ width: '80%' }}>Remaining Amount</Button>
//                             <br />
//                             <Button type="primary" onClick={Logout} style={{ width: '80%' }}>Logout</Button>
//                         </Drawer>
//                     </Col>
//                     <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
//                         BIIT Committee-DashBoard
//                     </Col>
//                     <Col>
//                         <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
//                     </Col>
//                 </Row>
//             </Header>
//             <Content className='content'>
//                 <div>
//                     <Card
//                         title="Remaining Application"
//                         style={{
//                             width: 500,
//                             margin: '20px auto',
//                         }}
//                     >
//                         <p className='card-para'>Left<sup><Badge count={documents.length} /></sup></p>
//                     </Card>
//                     <Search placeholder="Search" />
//                     <br />
//                     <div className="card-container">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             documents.map((document, index) => (
//                                 <DocumentCard key={index} document={document} />
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </Content>
//         </div>
//     );
// };

// export default App;
