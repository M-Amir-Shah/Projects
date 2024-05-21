import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const App = (props) => (
  <>
    <Input size="large" prefix={<UserOutlined />} {...props} required/>
    <br />
  </>
);
export default App;