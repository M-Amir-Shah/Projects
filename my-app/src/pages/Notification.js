import React, { useState, useEffect, useRef } from 'react';
import '../Styling/Notification.css';
import { FloatButton, List, Avatar, notification } from 'antd';

const App = () => {
  const [showList, setShowList] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: 'Mike Johnson', age: 35, sex: 'Male', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 2, name: 'John Doe', age: 36, sex: 'Male', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 3, name: 'Jane Smith', age: 25, sex: 'Female', avatar: 'https://i.pravatar.cc/150?img=2' },
  ].sort((a, b) => b.age - a.age));
  const [newUsers, setNewUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const listRef = useRef(null);

  const handleClick = () => {
    setShowList((prevState) => !prevState);

    if (!showList) {
      // When the list is shown, reset unread count and highlight
      setUnreadCount(0);
      setNewUsers([]);
    }
  };

  const fetchNewData = () => {
    const newUser = {
      id: data.length + 1,
      name: `New User ${Math.floor(Math.random() * 50)}`,
      age: Math.floor(Math.random() * 50) + 20,
      sex: Math.random() > 0.5 ? 'Male' : 'Female',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };

    // Update data and newUsers states
    setData((prevData) => [newUser, ...prevData].sort((a, b) => b.age - a.age));
    setNewUsers((prevNewUsers) => [newUser, ...prevNewUsers]);
    setUnreadCount((prevCount) => prevCount + 1);

    notification.open({
      message: 'New User Added',
      description: `${newUser.name} (${newUser.sex}), ${newUser.age} years old`,
      icon: <Avatar src={newUser.avatar} />,
      onClick: () => {
        setUnreadCount(0);
        setNewUsers([]);
      },
    });
  };

  useEffect(() => {
    let interval;
    if (showList) {
      interval = setInterval(() => {
        fetchNewData();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [showList]);

  useEffect(() => {
    if (listRef.current && newUsers.length > 0) {
      listRef.current.scrollTop = 0; // Scroll to the top of the list container when new users are added
    }
  }, [newUsers]);

  useEffect(() => {
    if (showList && newUsers.length > 0) {
      const timer = setTimeout(() => {
        setNewUsers([]); // Clear highlights after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showList]);

  return (
    <div>
      <FloatButton
        onClick={handleClick}
        badge={{
          count: unreadCount,
          overflowCount: 999,
        }}
      />
      <div className={`list-container ${showList ? 'open' : 'closed'}`} ref={listRef}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item className={newUsers.find(user => user.id === item.id) ? 'highlight' : ''}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={`${item.name} (${item.sex})`}
                description={`${item.age} years old`}
              />
            </List.Item>
          )}
          style={{ marginTop: 20 }}
        />
      </div>
    </div>
  );
};

export default App;



// import React, { useState, useEffect, useRef, message } from 'react';
// import '../Styling/Notification.css';
// import { FloatButton, List, Avatar } from 'antd';
// import EndPoint from '../endpoints';

// const App = () => {
//   const [showList, setShowList] = useState(false);
//   const [data, setData] = useState([]);
//   const listRef = useRef(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${EndPoint.notifications}`);
//       const result = await response.json();
//       console.log('Fetched data:', result); // Log the data to verify its structure
//       setData(result.sort((a, b) => b.feedback - a.feedback));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchStudentRecords = async () => {
//     try {
//       const response = await fetch(EndPoint.getAllStudents);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching student records:', error);
      
//       message.error('Failed to load student records.');
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Initial fetch

//     // No need for interval since we're not fetching new data
//   }, []);

//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = 0; // Scroll to the top of the list container
//     }
//   }, [data]);

//   return (
//     <div>
//       <FloatButton
//         onClick={() => setShowList((prevState) => !prevState)}
//       />
//       <div className={`list-container ${showList ? 'open' : 'closed'}`} ref={listRef}>
//         <List
//           itemLayout="horizontal"
//           dataSource={data}
//           renderItem={(item) => (
//             <List.Item>
//               <List.Item.Meta
//                 avatar={<Avatar src={item.avatar} />}
//                 title={`${item.studentId} (${item.session})`}
//                 description={`Rating: ${item.feedback}`}
//               // Ensure 'feedback' is displayed correctly
//               />

//             </List.Item>
//           )}
//           style={{ marginTop: 20 }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;
