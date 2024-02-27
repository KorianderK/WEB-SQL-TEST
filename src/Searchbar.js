// Import React and the useState hook from the 'react' library
import React, { useState } from 'react';

// Define the SearchBar component and receive 'onSearch' and 'clearError' props
const SearchBar = ({ onSearch, clearError }) => {
  // Initialize state for the purchase ID and error
  const [purchaseId, setPurchaseId] = useState('');

  // Function to handle the search button click
  const handleSearch = () => {
    // Sanitize the purchase ID by removing non-numeric characters
    const sanitizedPurchaseId = purchaseId.replace(/[^0-9]/g, '');
    // Call the 'onSearch' prop with the sanitized purchase ID
    onSearch(sanitizedPurchaseId);
  };

  // Function to handle changes in the input field
  const handleChange = (e) => {
    // Sanitize the input value by removing non-numeric characters
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
    // Set the sanitized value to the 'purchaseId' state
    setPurchaseId(sanitizedValue);
    // Call the 'clearError' prop to clear the error state
    clearError();
  };

  // Render the SearchBar component
  return (
    <div>
      {/* Label for the input field */}
      <label htmlFor="purchaseId">Enter brand/model: </label>
      {/* Input field for the purchase ID */}
      <input
        type="text"
        id="purchaseId"
        value={purchaseId}
        onChange={handleChange}
        placeholder="Enter Purchase ID"
      />
      {/* Render the search button only if there is some input in the search bar */}
      {purchaseId.trim() !== '' && (
        <button onClick={handleSearch}>Search</button>
      )}
    </div>
  );
};

// Export the SearchBar component as the default export
export default SearchBar;
