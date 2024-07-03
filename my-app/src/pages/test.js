import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';

const AssignGrader = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignGrader, setAssignGrader] = useState([]);
  const [filteredAssignGrader, setFilteredAssignGrader] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [assignedGraders, setAssignedGraders] = useState({});
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [filteredModalData, setFilteredModalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filteredData = modalData.filter(item =>
      item.name.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );
    setFilteredModalData(filteredData);
  }, [modalSearchQuery, modalData]);

  const handleModalSearchChange = (text) => {
    setModalSearchQuery(text);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/FinancialAidAllocation/api/Admin/unAssignedGraders1`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setAssignGrader(data);
        setFilteredAssignGrader(data);
      } else {
        console.error('Failed to fetch graders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching graders:', error);
    }
  };

  const fetchModalData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/FinancialAidAllocation/api/Admin/FacultyMembers`);
      if (response.ok) {
        const data = await response.json();
        console.log('Modal Data:', data);
        setModalData(data);
      } else {
        console.error('Failed to fetch modal data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching modal data:', error);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchModalData();
    }
  }, [isModalVisible]);

  const handleAssignButtonPress = async (faculty) => {
    if (faculty.assigned || assignedGraders[faculty.student_id]) return;
    setSelectedTeacherId(faculty.id);

    try {
      await AsyncStorage.setItem('selectedStudentId', faculty.student_id.toString());
      fetchModalData();
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const handleAssignGrader = async (item) => {
    const studentId = await AsyncStorage.getItem('selectedStudentId');
    if (!studentId) {
      console.error('Student ID not found in AsyncStorage');
      return;
    }

    Alert.alert(
      'Confirmation',
      `Do you want to assign a grader to ${item.name} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const url = `${BASE_URL}/FinancialAidAllocation/api/Admin/AssignGrader?studentid=${studentId}&facultyId=${item.facultyId}`;
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                console.log('Grader assigned successfully');
                Alert.alert('Success', 'Grader assigned successfully');
                setAssignedGraders(prevState => ({ ...prevState, [studentId]: true }));
              } else {
                const errorData = await response.json();
                console.error('Failed to assign grader:', response.statusText, errorData);
              }
            } catch (error) {
              console.error('Error assigning grader:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleTouchFlatlist = (item) => {
    //props.navigation.navigate("GraderInfo", { grader: item });
  };

  useEffect(() => {
    const filteredData = assignGrader.filter(item =>
      item && item.arid_no && item.arid_no.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssignGrader(filteredData);
  }, [searchQuery, assignGrader]);

  const renderFacultyMember = ({ item }) => {
    const isHighlighted = item.AverageRating< 4 && item.AverageRating ;
    

    return (
      <View style={[styles.facultyMemberContainer, isHighlighted && styles.highlighted]}>
      <TouchableOpacity onPress={() => handleTouchFlatlist(item)}>
        <View style={styles.nameContainer}>
          <Text style={styles.facultyMemberName}>{item.name}</Text>
          <Text style={styles.aridNoText}>{item.arid_no}</Text>
          
          <Text style={styles.aridNoTexts}> Rating Previous semester:{item.AverageRating  } </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAssignButtonPress(item)}
        disabled={item.assigned || assignedGraders[item.student_id]}
        style={styles.assignButtonContainer}
      >
        <View style={[styles.addButton, { backgroundColor: item.assigned || assignedGraders[item.student_id] ? 'gray' : 'green' }]}>
          <Text style={styles.addButtonText}>{item.assigned || assignedGraders[item.student_id] ? 'Assigned' : 'Assign'}</Text>
        </View>
      </TouchableOpacity>  
      </View>
    );
  };


  // const renderFacultyMember = ({ item }) => (
     
  //   <View style={styles.facultyMemberContainer}>
  //     <TouchableOpacity onPress={() => handleTouchFlatlist(item)}>
  //       <View style={styles.nameContainer}>
  //         <Text style={styles.facultyMemberName}>{item.name}</Text>
  //         <Text style={styles.aridNoText}>{item.arid_no}</Text>
          
  //         <Text style={styles.aridNoTexts}>{item.AverageRating  } </Text>
  //       </View>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       onPress={() => handleAssignButtonPress(item)}
  //       disabled={item.assigned || assignedGraders[item.student_id]}
  //       style={styles.assignButtonContainer}
  //     >
  //       <View style={[styles.addButton, { backgroundColor: item.assigned || assignedGraders[item.student_id] ? 'gray' : 'green' }]}>
  //         <Text style={styles.addButtonText}>{item.assigned || assignedGraders[item.student_id] ? 'Assigned' : 'Assign'}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );

  const renderModalFacultyMember = ({ item }) => (
    <View style={styles.facultyMemberContainer}>
      <TouchableOpacity onPress={() => handleAssignGrader(item)}>
        {item.profilePic ? (
          <Image
            source={{ uri: `${BASE_URL}/FinancialAidAllocation/Content/ProfileImages/${item.profilePic}` }}
            style={styles.facultyImage}
          />
        ) : (
          <Image
            source={require('./logo.png')}
            style={styles.facultyImage}
          />
        )}
        <Text style={styles.facultyMemberNames}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  
  
  
  
  
  
    

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>UnAssign Grader List</Text>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.searchBarContainer}>
        <Image source={require('./Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="ARID NO#"
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredAssignGrader}
        renderItem={renderFacultyMember}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Search bar inside modal */}
            <View style={styles.searchBarContainer}>
              <Image source={require('./Search.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search by name"
                placeholderTextColor="black"
                value={modalSearchQuery}
                onChangeText={handleModalSearchChange}
              />
            </View>
            {/* FlatList with filtered modal data */}
            <FlatList
              data={filteredModalData}
              renderItem={renderModalFacultyMember}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82b7bf',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  assignButtonContainer: {
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 1,
    color: 'red',
    fontSize: 24,
    marginTop: 10,
  },
  horizontalLine: {
    backgroundColor: 'black',
    height: 2,
    width: '100%',
    marginTop: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  highlighted: {
    backgroundColor: 'pink',
  },
  
  highlighteds: {
    backgroundColor: 'white',
  },

  searchBar: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  facultyMemberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  facultyMemberName: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  facultyMemberNames: {
    fontSize: 29,
    color: 'green',
    marginBottom: 5,
  },
  aridNoText: {
    fontSize: 16,
    color: 'green',
  },
  
  aridNoTexts: {
    fontSize: 16,
    color: 'red',
  },
  addButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#82b7bf',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#001',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '70%',
  },
  facultyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default AssignGrader;