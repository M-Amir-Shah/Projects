import React, { useState } from 'react';

const GenderSelection = () => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <h2>Select Gender:</h2>
      <label>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={handleGenderChange}
        />
        Female
      </label>
    </div>
  );
};

export default GenderSelection;
