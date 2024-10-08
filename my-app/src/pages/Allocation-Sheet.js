import React, { useState, useEffect } from 'react';
import { Tabs, Layout, Row, Col, Button, Table, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './BiitLogo.jpeg';
import "../Styling/Allocation-Sheet.css";
import EndPoint from '../endpoints';
import { render } from '@antv/g2';

const { Header } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

const AddFaculty = () => {
    const navigate = useNavigate();
    const [needBaseData, setNeedBaseData] = useState([]);
    const [meritBaseData, setMeritBaseData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [needBaseResponse, meritBaseResponse] = await Promise.all([
                getNeedBaseData(),
                getMeritBaseData(),
            ]);
            const needBaseProcessedData = processNeedBaseData(needBaseResponse.data);
            setNeedBaseData(needBaseProcessedData);
            console.log(needBaseProcessedData);
            setMeritBaseData(meritBaseResponse.data);
            console.log("Merit Base", meritBaseResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getNeedBaseData = async () => {
        return axios.get(`${EndPoint.accepted}`);
    };

    const getMeritBaseData = async () => {
        return axios.get(`${EndPoint.meritBaseShortListing}`);
    };

    const processNeedBaseData = (data) => {
        return data.map(item => {
            const { arid_no, name, degree, gender, cgpa, prev_cgpa, suggestion, amount } = item.re;
            const totalAmount = amount || suggestion.reduce((total, sugg) => total + parseFloat(sugg.amount || 0), 0);
            return {
                arid_no,
                name,
                degree,
                gender,
                cgpa,
                prev_cgpa: prev_cgpa || null,
                amount: item.applicationStatus === "Accepted" ? item.amount : null,
            };
        });
    };

    const Cancel = () => {
        navigate('/Admin-Dashboard');
    };

    // Calculate total fee for Needbase tab
    const totalFee = needBaseData.reduce((total, item) => {
        const amount = item.amount?.replace('', '').replace(',', '');
        return total + parseFloat(amount || 0);
    }, 0);

    const totalMaleFee = needBaseData
        .filter(item => item.gender === 'M')
        .reduce((total, item) => {
            const amount = item.amount?.replace('', '').replace(',', '');
            return total + parseFloat(amount || 0);
        }, 0);

    const totalFemaleFee = needBaseData
        .filter(item => item.gender === 'F')
        .reduce((total, item) => {
            const amount = item.amount?.replace('', '').replace(',', '');
            return total + parseFloat(amount || 0);
        }, 0);

    // New calculations for Meritbase tab
    const totalMeritFee = meritBaseData.reduce((total, item) => {
        const amount = item.amount?.replace('', '').replace(',', '');
        return total + parseFloat(parseFloat(amount || 0).toFixed(2));
    }, 0);
    
    const totalMaleMeritFee = meritBaseData
        .filter(item => item.gender === 'M')
        .reduce((total, item) => {
            const amount = item.amount?.replace('', '').replace(',', '');
            return total + parseFloat(parseFloat(amount || 0).toFixed(2));
        }, 0);
    
    const totalFemaleMeritFee = meritBaseData
        .filter(item => item.gender === 'F')
        .reduce((total, item) => {
            const amount = item.amount?.replace('', '').replace(',', '');
            return total + parseFloat(parseFloat(amount || 0).toFixed(2));
        }, 0);
    

    const needBaseColumns = [
        { title: 'Arid No', dataIndex: 'arid_no', key: 'arid_no' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Discipline', dataIndex: 'degree', key: 'degree' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Current CGPA',
            dataIndex: 'cgpa',
            key: 'cgpa',
            render: (text) => (text ? parseFloat(text).toFixed(2) : 'N/A')
        },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' }
    ];

    const meritBaseColumns = [
        { title: 'Arid No', dataIndex: 'arid_no', key: 'arid_no' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Discipline', dataIndex: 'degree', key: 'degree' },
        { title: 'Semester', dataIndex: 'semester', key: 'semester' },
        { title: 'Section', dataIndex: 'section', key: 'section' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Current CGPA',
            dataIndex: 'cgpa',
            key: 'cgpa',
            render: (text) => (text ? parseFloat(text).toFixed(2) : 'N/A')
        },
        {
            title: 'Previous CGPA',
            dataIndex: 'prev_cgpa',
            key: 'prev_cgpa',
            render: (text) => (text ? parseFloat(text).toFixed(2) : 'N/A')
        },
        // { title: 'Position', dataIndex: 'position', key: 'position' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (text)=> (text ? parseFloat(text).toFixed(2): 'N/A') },
    ];

    return (
        <div>
            <Header className="navbar">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={Cancel} />
                    </Col>
                    <Col flex="auto" style={{ textAlign: 'center', fontSize: 'X-large' }}>
                        Allocation Sheet
                    </Col>
                    <Col>
                        <img src={logo} alt="BIIT Financial Aid Allocation Tool" style={{ height: '35px', width: '35px', borderRadius: '25px' }} />
                    </Col>
                </Row>
            </Header>
            <div className="container">
                <Tabs defaultActiveKey="1" className="custom-tabs">
                    <TabPane tab="Needbase" key="1" className="custom-tabpane">
                        <div className="tab-content">
                            <div className="tab-table">
                                <Table
                                    columns={needBaseColumns}
                                    dataSource={needBaseData}
                                    pagination={false}
                                    loading={loading}
                                    scroll={{ y: 400 }}
                                />
                                <div style={{ marginTop: '20px' }}>
                                    <Text strong>Total Fee: </Text>
                                    <Text>{`${totalFee.toLocaleString()} Rs.`}</Text>
                                    <br/>
                                    <Text strong>Total Male: </Text>
                                    <Text>{`${totalMaleFee.toLocaleString()} Rs.`}</Text>
                                    <br/>
                                    <Text strong>Total Female: </Text>
                                    <Text>{`${totalFemaleFee.toLocaleString()} Rs.`}</Text>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Meritbase" key="2" className="custom-tabpane">
                        <div className="tab-content">
                            <div className="tab-table">
                                <Table
                                    columns={meritBaseColumns}
                                    dataSource={meritBaseData}
                                    pagination={false}
                                    loading={loading}
                                    scroll={{ y: 400 }}
                                />
                                <div style={{ marginTop: '20px' }}>
                                    <Text strong>Total Fee: </Text>
                                    <Text>{`${totalMeritFee.toLocaleString()} Rs.`}</Text>
                                    <br/>
                                    <Text strong>Total Male: </Text>
                                    <Text>{`${totalMaleMeritFee.toLocaleString()} Rs.`}</Text>
                                    <br/>
                                    <Text strong>Total Female: </Text>
                                    <Text>{`${totalFemaleMeritFee.toLocaleString()} Rs.`}</Text>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default AddFaculty;
