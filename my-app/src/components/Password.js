import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';

const App = (props) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Input.Password
      size='large'
      prefix={<UnlockOutlined />}
      required
      {...props}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};
export default App;