import React from 'react';
import { Button, Flex } from 'antd';
const App = (props) => (
    <Flex
        vertical
        gap="small"
        style={{
            width: '100%',
        }}
    >
        <Button type="primary" block>
            {...props}
        </Button>

    </Flex>
);
export default App;