import React from 'react';
import { Button, Flex } from 'antd';
const App = () => (
    <Flex
        vertical
        gap="small"
        style={{
            width: '100%',
        }}
    >
        <Button type="primary" block>
            Login
        </Button>

    </Flex>
);
export default App;