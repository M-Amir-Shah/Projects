// App.js
import React,{useState} from 'react';
import { Card, Layout, Row, Col,Badge, Button } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, FileImageOutlined,ArrowLeftOutlined } from '@ant-design/icons';
import '../Styling/NeedbaseApplication.css';
import { useNavigate } from "react-router-dom";
import logo from './BiitLogo.jpeg';
import Search from '../components/SearchingButton';

const { Header, Content } = Layout;
const { Meta } = Card;

const DocumentCard = ({ document }) => {
    const getDocumentIcon = () => {
        const fileType = document.type.toLowerCase();
        if (fileType === 'pdf') {
            return <FilePdfOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'xls' || fileType === 'xlsx') {
            return <FileExcelOutlined style={{ fontSize: '100px' }} />;
        } else if (fileType === 'jpeg' || fileType === 'png') {
            return <FileImageOutlined style={{ fontSize: '100px' }} />;
        } else{
            return <FileImageOutlined style={{ fontSize: '100px' }} />; // Display a generic file icon for unsupported file types
        } 
    };

    return (
        <Card
            style={{ width: 300, margin: '20px' }}
            cover={getDocumentIcon()}
        >
            <Meta title={document.title} />
            <Meta description={document.description} />
        </Card>
    );
};

const App = () => {
    const history = useNavigate();
    const [show, setShow] = useState(true);
    const documents = [
        { title: 'Awais', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Shahzad', description: 'This is an image document', type: 'jpeg' },
        { title: 'Usman', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Ahmad', description: 'This is an Excel document', type: 'xls' },
        { title: 'Zain', description: 'This is an image document', type: 'jpeg' },
        { title: 'Amir', description: 'This is an Excel document', type: 'xls' },
        { title: 'Awais', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Shahzad', description: 'This is an image document', type: 'jpeg' },
        { title: 'Usman', description: 'This is a PDF document', type: 'pdf' },
        { title: 'Zain', description: 'This is an image document', type: 'jpeg' },
        { title: 'Amir', description: 'This is an Excel document', type: 'xls' },
    ];
    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                    <Button type="text" icon={<ArrowLeftOutlined />} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large', color: '#ffff' }}>
                        (BIIT) Needbase Application
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
                        <p className='card-para'>Left<sup><Badge count={show ? 12 : 0} /></sup></p>
                    </Card>
                    <Search placeholder="Search" />
                    <br />
                    <div className="card-container">
                        {documents.map((document, index) => (
                            <DocumentCard key={index} document={document} />
                        ))}
                    </div>
                </div>
            </Content>
        </div>
    );
};

export default App;
