import React from 'react';
import { Flex, Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const App = (props) => (
    <Flex vertical gap={32}>
       
        <TextArea
            showCount
            maxLength={1000}
            onChange={onChange}
            {...props}
            required
            style={{
                height: 120,
                resize: 'none',
            }}
        />
    </Flex>
);
export default App;