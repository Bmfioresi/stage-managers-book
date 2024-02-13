import React, { useState, useEffect } from 'react';

function Hub() {
  // State to store the fetched data
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    fetchData();
  }, []); // Empty dependency array to fetch data only once when component mounts

  // Function to fetch data from the database
  const fetchData = async () => {
    try {
      // Make an HTTP request to fetch data
      const response = await fetch('http://localhost:8000/hubs');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      // Parse the JSON response
      const jsonData = await response.json();
      // Update state with the fetched data
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Hubs</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Hub;