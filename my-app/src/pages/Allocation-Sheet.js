import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Table, Typography, Spin, Row, Col } from 'antd';
import EndPoint from '../endpoints';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AllocationDetails({ session }) {
  const [loading, setLoading] = useState(true);
  const [mGirl, setMGirl] = useState(0);
  const [mBoy, setMBoy] = useState(0);
  const [mGirlsAmount, setMGirlsAmount] = useState(0);
  const [mBoysAmount, setMBoysAmount] = useState(0);
  const [nGirl, setNGirl] = useState(0);
  const [nBoy, setNBoy] = useState(0);
  const [nGirlsAmount, setNGirlsAmount] = useState(0);
  const [nBoysAmount, setNBoysAmount] = useState(0);
  const [totalNeedBase, setTotalNeedBase] = useState(0);
  const [totalMeritBase, setTotalMeritBase] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [needBaseRes, meritBaseRes] = await Promise.all([
          axios.get('/path/to/needbase/api'),
          axios.get('/path/to/meritbase/api')
        ]);

        let totalNeed = 0;
        let nGirlCount = 0;
        let nBoyCount = 0;
        let nGirlAmt = 0;
        let nBoyAmt = 0;

        needBaseRes.data.forEach(app => {
          totalNeed += parseInt(app.amount, 10);
          if (app.gender === 'Female') {
            nGirlCount++;
            nGirlAmt += parseInt(app.amount, 10);
          } else {
            nBoyCount++;
            nBoyAmt += parseInt(app.amount, 10);
          }
        });

        setTotalNeedBase(totalNeed);
        setNGirl(nGirlCount);
        setNBoy(nBoyCount);
        setNGirlsAmount(nGirlAmt);
        setNBoysAmount(nBoyAmt);

        let totalMerit = 0;
        let mGirlCount = 0;
        let mBoyCount = 0;
        let mGirlAmt = 0;
        let mBoyAmt = 0;

        meritBaseRes.data.forEach(student => {
          totalMerit += parseInt(student.amount, 10);
          if (student.gender === 'Female') {
            mGirlCount++;
            mGirlAmt += parseInt(student.amount, 10);
          } else {
            mBoyCount++;
            mBoyAmt += parseInt(student.amount, 10);
          }
        });

        setTotalMeritBase(totalMerit);
        setMGirl(mGirlCount);
        setMBoy(mBoyCount);
        setMGirlsAmount(mGirlAmt);
        setMBoysAmount(mBoyAmt);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const needBaseColumns = [
    { title: 'Arid No', dataIndex: 'aridNo', key: 'aridNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Discipline', dataIndex: 'degree', key: 'degree' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Current CGPA', dataIndex: 'cgpa', key: 'cgpa' },
    { title: 'Previous CGPA', dataIndex: 'prevCgpa', key: 'prevCgpa' },
    { title: 'Fee Exempted', dataIndex: 'exemptedAmount', key: 'exemptedAmount' }
  ];

  const meritBaseColumns = [
    { title: 'Arid No', dataIndex: 'aridNo', key: 'aridNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Discipline', dataIndex: 'degree', key: 'degree' },
    { title: 'Semester', dataIndex: 'semester', key: 'semester' },
    { title: 'Section', dataIndex: 'section', key: 'section' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Current CGPA', dataIndex: 'cgpa', key: 'cgpa' },
    { title: 'Previous CGPA', dataIndex: 'prevCgpa', key: 'prevCgpa' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' }
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <Title level={3}>Allocation Details</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        {loading ? (
          <Spin tip="Loading...">
            <Table columns={needBaseColumns} dataSource={[]} pagination={false} />
            <Table columns={meritBaseColumns} dataSource={[]} pagination={false} />
          </Spin>
        ) : (
          <>
            <Title level={4}>{session} Allocation Summary</Title>
            <Row>
              <Col span={5}><Text strong>AidType</Text></Col>
              <Col span={5}><Text strong>Gender</Text></Col>
              <Col span={4}><Text strong>Strength</Text></Col>
              <Col span={5}><Text strong>Amount</Text></Col>
              <Col span={5}><Text strong>Total</Text></Col>
            </Row>
            <Row>
              <Col span={5}><Text>MeritBase Amount</Text></Col>
              <Col span={5}>
                <Row><Text>Female</Text></Row>
                <Row><Text>Male</Text></Row>
              </Col>
              <Col span={4}>
                <Row><Text>{mGirl}</Text></Row>
                <Row><Text>{mBoy}</Text></Row>
              </Col>
              <Col span={5}>
                <Row><Text>{mGirlsAmount}</Text></Row>
                <Row><Text>{mBoysAmount}</Text></Row>
              </Col>
              <Col span={5}><Text>{totalMeritBase}</Text></Col>
            </Row>
            <Row>
              <Col span={5}><Text>NeedBase Amount</Text></Col>
              <Col span={5}>
                <Row><Text>Female</Text></Row>
                <Row><Text>Male</Text></Row>
              </Col>
              <Col span={4}>
                <Row><Text>{nGirl}</Text></Row>
                <Row><Text>{nBoy}</Text></Row>
              </Col>
              <Col span={5}>
                <Row><Text>{nGirlsAmount}</Text></Row>
                <Row><Text>{nBoysAmount}</Text></Row>
              </Col>
              <Col span={5}><Text>{totalNeedBase}</Text></Col>
            </Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <Text>Total Amount: {totalMeritBase + totalNeedBase}</Text>
            </Row>
          </>
        )}
      </Content>
    </Layout>
  );
}

export default AllocationDetails;
