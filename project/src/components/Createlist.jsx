import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInputForm = () => {
  const navigate = useNavigate()
  const [listitem, setListitem] = useState('');

  const handleInputChange = (e) => {
    setListitem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/createlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listitem: listitem }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/')
      } else {
        console.log('Failed to send data to the server');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User Input:</label>
        <input
          type="text"
          value={listitem}
          onChange={handleInputChange}
          placeholder="Type tasks here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInputForm;
