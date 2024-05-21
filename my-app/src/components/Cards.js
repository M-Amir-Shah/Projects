import React from 'react';
import { Card, Flex } from 'antd';
const { Meta } = Card;
const App = () => (
    <Card
        hoverable
        style={{
            width: 200,
            direction: 'row',
            margin:20,
            
            
        }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta title="Apply for Needbase" />
    </Card>
);
export default App;