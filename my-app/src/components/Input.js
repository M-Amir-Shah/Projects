import React from 'react';

import { Input } from 'antd';
const App = (props) => (
  <>
    {/* <Input size="large"  required/> */}
    <Input
        size="large"
        {...props}
        required/>
    <br />
  </>
);
export default App;