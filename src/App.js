import React, { useState } from 'react';
import SearchBar from './Searchbar';

const App = () => {
  const [carInfo, setCarInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (purchaseId) => {
    try {
      setError(null);

      // if (!navigator.onLine) {
      //   throw new Error('Server is not reachable. Please check your network connection.');
      // }

      const response = await fetch(`http://localhost:5000/api/car/${purchaseId}`);

      if (!response.ok) {
        throw new Error('Purchase ID not found');
      }

      const responseData = await response.text();

      // Check for an empty response before attempting to parse as JSON
      if (!responseData.trim()) {
        throw new Error('No data found for the given ID');
      }

      const data = JSON.parse(responseData);
      console.log('Data retrieved for purchase ID', purchaseId);
      setCarInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);

      if (error.message === 'Failed to fetch') {
        setError('Server is not reachable. Please contact the IT department.');
      } else {
        setError(error.message);
      }

      setCarInfo(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      <h1>Car Dealership Finance Department</h1>
      <SearchBar onSearch={handleSearch} clearError={clearError} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {carInfo && (
        <div>
          <h2>Car Information</h2>
          <p>Brand: {carInfo.brand}</p>
          <p>Model: {carInfo.model}</p>
          <p>Make: {carInfo.make}</p>
          <p>Color: {carInfo.color}</p>
          <p>Customer: {carInfo.customer_name}</p>
          <p>Date of purchase: {carInfo.purchase_date}</p>
          <p>Purchase ID: {carInfo.purchase_id}</p>
          <p>Dealership: {carInfo.purchase_location}</p>
          <p>Payment tenure: {carInfo.tenure_duration}</p>
          <p>Warranty: {carInfo.warranty_status}</p>
          {/* Add more information as needed here */}
        </div>
      )}
    </div>
  );
};

export default App;