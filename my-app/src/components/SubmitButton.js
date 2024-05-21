import React from 'react';
import { Button, Flex } from 'antd';
const App = (props) => (
    <Flex
        vertical
        gap="small"
        {...props}
        style={{
            width: '100%',
        }}
    >
        <Button type="primary" block/>
            
        

    </Flex>
);
export default App;