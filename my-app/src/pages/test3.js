
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





import React, { useState, useEffect } from 'react';
import EndPoint from '../endpoints';
import '../Styling/test3.css';

const FacultyMember = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [facultyMembers, setFacultyMembers] = useState([]);
    const [filteredFacultyMembers, setFilteredFacultyMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [noGraderAssigned, setNoGraderAssigned] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${EndPoint.getFacultyMembers}`);
            const data = await response.json();
            setFacultyMembers(data);
            setFilteredFacultyMembers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchModalData = async (facultyId) => {
        try {
            setModalLoading(true);
            setNoGraderAssigned(false);
            const response = await fetch(`${EndPoint.getGraderInfo}id=${facultyId}`);
            const data = await response.json();

            if (data.Message === "No Grader Assigned") {
                setNoGraderAssigned(true);
                setModalData([]);
            } else {
                setNoGraderAssigned(false);
                setModalData(data);
            }
        } catch (error) {
            console.error('Error fetching modal data:', error);
            alert('Failed to fetch modal data. Please try again later.');
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filterFacultyMembers = () => {
            const filtered = facultyMembers.filter(member =>
                member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFacultyMembers(filtered);
        };

        filterFacultyMembers();
    }, [searchQuery, facultyMembers]);

    const handleAddIconPress = () => {
        props.navigation.navigate('AddFacultyMembers');
    };

    const handleFacultyNamePress = (facultyId) => {
        setModalVisible(true);
        fetchModalData(facultyId);
    };

    const handleModalNamePress = async (studentId) => {
        if (window.confirm("Are you sure you want to remove this Grader?")) {
            try {
                const response = await fetch(`${EndPoint.removeGrader}id=${studentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId })
                });

                if (response.ok) {
                    const updatedModalData = modalData.filter(item => item.studentId !== studentId);
                    setModalData(updatedModalData);
                } else {
                    console.error('Error removing student');
                    alert('Failed to remove student. Please try again later.');
                }
            } catch (error) {
                console.error('Error removing student:', error);
                alert('Failed to remove student. Please try again later.');
            }
        }
    };

    const renderFacultyMember = (item) => (
        <div key={item.facultyId} className="faculty-member">
            <img
                src={item.profilePic ? `${EndPoint.imageUrl}${item.profilePic}` : './logo.png'}
                alt="Profile"
                className="profile-image"
            />
            <div className="faculty-name">
                <button onClick={() => handleFacultyNamePress(item.facultyId)}>
                    {item.name}
                </button>
            </div>
        </div>
    );

    const renderModalFacultyMember = (item) => (
        <button key={item.studentId} onClick={() => handleModalNamePress(item.studentId)} className="modal-member">
            <div className="modal-member-content">
                <img
                    src={item.profile_image ? `${EndPoint.imageUrl}${item.profile_image}` : './logo.png'}
                    alt="Profile"
                    className="profile-image"
                />
                <span>{item.name}</span>
            </div>
        </button>
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    return (
        <div className="faculty-container">
            <div className="header">
                <h2>Faculty Members</h2>
                <button onClick={handleAddIconPress} className="add-button">
                    <img src="./Add.png" alt="Add" />
                </button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Faculty Members"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="faculty-list">
                    {filteredFacultyMembers.map(renderFacultyMember)}
                </div>
            )}

            {modalVisible && (
                <div className="modal-overlay" onClick={() => setModalVisible(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Grader Details</h3>
                        {modalLoading ? (
                            <div>Loading...</div>
                        ) : noGraderAssigned ? (
                            <p>No Grader Assigned</p>
                        ) : (
                            <div className="modal-list">
                                {modalData.map(renderModalFacultyMember)}
                            </div>
                        )}
                        <button onClick={() => setModalVisible(false)} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyMember;
