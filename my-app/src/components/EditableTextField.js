import React, { useState } from 'react';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditableTextField = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Input 
      value={value}
      onChange={handleChange}
      allowClear
      suffix={<EditOutlined />}
    />
  );
};

export default EditableTextField;
