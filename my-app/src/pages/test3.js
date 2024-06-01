
// //                 Avatar to profile image

// import React, { useState, useRef } from 'react';
// import { Avatar } from 'antd';

// const AvatarComponent = () => {
//   const [avatarUrl, setAvatarUrl] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setAvatarUrl(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAvatarClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div>
//       <h2>Avatar</h2>
//       <Avatar src={avatarUrl} size={100} onClick={handleAvatarClick}>
//         {avatarUrl ? null : 'Upload'}
//       </Avatar>
//       <input
//         type="file"
//         onChange={handleImageUpload}
//         accept="image/*"
//         style={{ display: 'none' }}
//         ref={fileInputRef}
//       />
//     </div>
//   );
// };

// export default AvatarComponent;
