// import React, { useState, useEffect } from 'react';
// import { Button, Input, List, Avatar, Alert, Spin, Typography } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import EndPoint from '../endpoints';

// const { Text } = Typography;

// const AddCommitteeMember = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [facultyMembers, setFacultyMembers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchFacultyMembers();
//     }, []);

//     const fetchFacultyMembers = async () => {
//         try {
//             const response = await fetch(`${EndPoint.getFacultyMembers}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch faculty members');
//             }
//             const data = await response.json();
//             setFacultyMembers(data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setError(error);
//             setIsLoading(false);
//         }
//     };

//     const handleAddButtonPress = async (facultyId) => {
//         if (!facultyId) {
//             console.error('Invalid faculty ID:', facultyId);
//             return;
//         }

//         try {
//             const addResponse = await fetch(`${EndPoint.addFacultyMember}${facultyId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (addResponse.ok) {
//                 Alert.success('Faculty member added as a committee member.');
//             } else {
//                 const errorText = await addResponse.text();
//                 if (errorText.includes('Already Exist')) {
//                     Alert.error('This faculty member is already a committee member.');
//                 } else {
//                     Alert.error('Failed to add faculty member. ' + (errorText ? errorText : 'Please try again later.'));
//                 }
//             }
//         } catch (error) {
//             console.error('Error adding faculty member:', error);
//             Alert.error('An unexpected error occurred. Please try again later.');
//         }
//     };

//     const filteredFacultyMembers = facultyMembers.filter(member =>
//         member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (isLoading) {
//         return <Spin tip="Loading..." />;
//     }

//     if (error) {
//         return <Alert message="Error" description={error.message} type="error" />;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Add Committee Members</h2>
//             <Input
//                 prefix={<SearchOutlined />}
//                 placeholder="Search Faculty Members"
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 style={{ marginBottom: '20px' }}
//             />
//             <List
//                 itemLayout="horizontal"
//                 dataSource={filteredFacultyMembers}
//                 renderItem={item => (
//                     <List.Item
//                         actions={[<Button type="primary" onClick={() => handleAddButtonPress(item.facultyId)}>Add</Button>]}
//                     >
//                         <List.Item.Meta
//                             title={item.name}
//                         />
//                     </List.Item>
//                 )}
//             />
//         </div>
//     );
// };

// export default AddCommitteeMember;



import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Rate, List, Avatar } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import EndPoint from '../endpoints'; // Ensure you import the EndPoint object

const FormScreen = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [profileId, setProfileId] = useState(null);

    useEffect(() => {
        getStoredProfileId();
    }, []);

    const getStoredProfileId = async () => {
        try {
            const storedProfileId = await localStorage.getItem('profileId');
            if (storedProfileId !== null) {
                setProfileId(storedProfileId);
                fetchFacultyInfo(storedProfileId);
                fetchData(storedProfileId);
            }
        } catch (error) {
            console.error('Error retrieving profile ID from localStorage:', error);
        }
    };

    const fetchFacultyInfo = (profileId) => {
        fetch(`${EndPoint.facultyInfo}?id=${profileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setFacultyInfo(data);
                if (data && data.facultyId) {
                    localStorage.setItem('facultyId', data.facultyId.toString());
                }
                localStorage.setItem('Faculty', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching faculty information:', error);
                alert('Failed to fetch faculty information. Please try again later.');
            });
    };

    const fetchData = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.teachersGraders}?id=${profileId}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleRate = async () => {
        try {
            const studentId = selectedItem?.s.student_id;

            if (!studentId) {
                console.error('Error: Student ID not found');
                return;
            }

            const url = `${EndPoint.rateGraderPerformance}?facultyId=${profileId}&studentId=${studentId}&rate=${rating}&comment=${comment}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Rate submitted successfully');
            } else {
                const errorMessage = await response.text();
                alert('Error message:', errorMessage);
            }

            setComment('');
            setRating(0);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error submitting rate:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={facultyInfo?.profilePic ? `${EndPoint.imageUrl}${facultyInfo.profilePic}` : "./logo.png"}
                    size={64}
                />
                {facultyInfo && (
                    <div style={{ marginLeft: '20px' }}>
                        <h2>{facultyInfo.name}</h2>
                        <p>Faculty Member</p>
                    </div>
                )}
            </div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item onClick={() => handleItemPress(item)} style={{ cursor: 'pointer' }}>
                        <List.Item.Meta
                            title={item.s.name}
                            description={`ARID No: ${item.s.arid_no} | Semester: ${item.s.semester}`}
                        />
                    </List.Item>
                )}
            />

            <Modal
                title={`Give Rate & Comment To ${selectedItem?.s.name}`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleRate}>
                        Submit
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Enter comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Rate
                    value={rating}
                    onChange={setRating}
                    character={({ index }) => (index + 1 <= rating ? <StarFilled /> : <StarOutlined />)}
                />
            </Modal>
        </div>
    );
};

export default FormScreen;
