import React, { useState } from 'react';
import SearchBar from './Searchbar';

const App = () => {
  const [carInfo, setCarInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (purchaseId) => {
    try {
      setError(null);

      const response = await fetch(`http://localhost:5001/api/car/${purchaseId}`);
      if (!response.ok) {
        throw new Error('Purchase ID not found');
      }
      const data = await response.json();
      console.log('Data retrieved for purchase ID', purchaseId);
      setCarInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setCarInfo(null);
      setError('Purchase ID not found');
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
          {/* Add more information as needed */}
        </div>
      )}
    </div>
  );
};

export default App;