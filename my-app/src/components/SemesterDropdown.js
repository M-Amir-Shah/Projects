import React, { useState } from 'react';

const SemesterDropdown = () => {
  const [selectedSemester, setSelectedSemester] = useState('');

  const SemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <div>
      <label htmlFor="semester">Semester:</label>
      <select id="semester" value={selectedSemester} onChange={SemesterChange} required>
        <option value="" size="large">Select Semester </option>
        <option value="semester 1">Semester 1</option>
        <option value="semester 2">Semester 2</option>
        <option value="semester 3">Semester 3</option>
        <option value="semester 4">Semester 4</option>
        <option value="semester 5">Semester 5</option>
        <option value="semester 6">Semester 6</option>
        <option value="semester 7">Semester 7</option>
        <option value="semester 8">Semester 8</option>
        
      </select>
      
    </div>
  );
};

export default SemesterDropdown;
