
import React, { useState } from 'react';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../Styling/test.css'; // Ensure this path is correct

const ProfileImagePicker = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const ImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG file!');
      return;
    }

    if (!isLt2M) {
      alert('Image must smaller than 2MB!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      getBase64(file, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }, Math.random() * (5000 - 3000) + 3000); // Random delay between 3s and 5s
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="upload-button" className="avatar-uploader">
        {loading ? (
          <LoadingOutlined className="loading-spinner" />
        ) : imageUrl ? (
          <img src={imageUrl} alt="avatar" className="avatar-image" />
        ) : (
          <div className="upload-icon">
            {<CameraOutlined />}
            <div style={{ marginTop: 5 }}>Upload</div>
          </div>
        )}
      </label>
      <input
        id="upload-button"
        type="file"
        style={{ display: 'none' }}
        onChange={ImageUpload}
      />
    </div>
  );
};

export default ProfileImagePicker;

//              Css.js
// .avatar-uploader {
//     display: inline-block;
//     cursor: pointer;
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     border: 2px dashed #d9d9d9;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     overflow: hidden;
//   }
  
//   .avatar-uploader:hover {
//     border-color: #1890ff;
//   }
  
//   .avatar-image {
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     object-fit: cover;
//   }
  
//   .upload-icon {
//     font-size: 20px;
//     color: #999;
//   }
//   .upload-icon { text {
//     font-size: 20px;
//     color: #999;
//   }}
  
//   .loading-spinner {
//     font-size: 32px;
//     color: #1890ff;
//     animation: spin 2s linear infinite;
//   }
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
  