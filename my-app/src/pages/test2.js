// import React, { useState } from 'react';
// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const PicturesWall = () => {
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [fileList, setFileList] = useState([]);

//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = (file) => {
//     setPreviewImage(file.thumbUrl || file.url); // Ensure correct URL usage
//     setPreviewVisible(true);
//   };

//   const handleChange = ({ fileList }) => setFileList(fileList);

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div className="ant-upload-text">Upload</div>
//     </div>
//   );

//   return (
//     <div className="clearfix">
//       <Upload
//         action="//jsonplaceholder.typicode.com/posts/"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 3 ? null : uploadButton}
//       </Upload>
//       <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </div>
//   );
// };

// export default PicturesWall;




