import React, { useState } from 'react';

const SectionDropdown = () => {
  const [selectedSection, setSelectedSection] = useState('');

  const SectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div>
      <select id="section" value={selectedSection} onChange={SectionChange} required>
        <option value="" size="large">Select Section </option>
        <option value="BSCS 1">BSCS 1</option>
        <option value="BSCS 2">BSCS 2</option>
        <option value="BSCS 3">BSCS 3</option>
        <option value="BSCS 4">BSCS 4</option>
        <option value="BSCS 5">BSCS 5</option>
        <option value="BSCS 6">BSCS 6</option>
        <option value="BSCS 7">BSCS 7</option>
        <option value="BSCS 8">BSCS 8</option>
        
      </select>
      
    </div>
  );
};

export default SectionDropdown;
