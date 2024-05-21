// import React from 'react';
// import { Input } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';

// const SearchField = () => {
//   return (
//     <Input
//       placeholder="Search"
//       prefix={<SearchOutlined />}
//     />
//   );
// };

// export default SearchField;
import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchField = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    
    // Perform search operation here, you can use setTimeout to debounce the search
    // For example:
    // setTimeout(() => {
    //   console.log('Performing search for:', value);
    //   // Call your search function here with the search value
    // }, 300); // Debounce time in milliseconds
  };

  return (
    <Input
      size='large'
      {...props}
      value={searchValue} 
      onChange={handleSearchChange} 
      suffix={<SearchOutlined />}
    />
  );
};

export default SearchField;

