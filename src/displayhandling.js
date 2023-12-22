// DisplayHandling.js
import React, { useState } from "react";

const DisplayHandling = ({ availableFields, onDisplaySubmit }) => {
  const [selectedAvailableFields, setSelectedAvailableFields] = useState([]);
  const [selectedDisplayedFields, setSelectedDisplayedFields] = useState([]);

  const handleAddFields = () => {
    if (selectedAvailableFields.length > 0) {
      // Add selected fields to displayed fields
      setSelectedDisplayedFields([...selectedDisplayedFields, ...selectedAvailableFields]);

      // Remove selected fields from available fields
      const remainingAvailableFields = availableFields.filter(
        (field) => !selectedAvailableFields.includes(field)
      );
      setSelectedAvailableFields([]);
      onDisplaySubmit(remainingAvailableFields);
    }
  };

  const handleRemoveFields = () => {
    if (selectedDisplayedFields.length > 0) {
      // Remove selected fields from displayed fields
      const remainingDisplayedFields = selectedDisplayedFields.filter(
        (field) => !selectedAvailableFields.includes(field)
      );
      setSelectedDisplayedFields([]);
      onDisplaySubmit(remainingDisplayedFields);
    }
  };

  return (
    <div>
      <h2>Step 3: Display Handling</h2>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          <label>Available Fields:</label>
        </div>
        <div> &nbsp </div>
        <div> <label>Fields to be displayed:</label> </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          <select
            multiple
            value={selectedAvailableFields}
            onChange={(e) =>
              setSelectedAvailableFields(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {availableFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <button onClick={handleAddFields}>&gt;&gt;</button>
          <button onClick={handleRemoveFields}>&lt;&lt;</button>
        </div>
        <div >
          <select
            multiple
            value={selectedDisplayedFields}
            onChange={(e) =>
              setSelectedDisplayedFields(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {selectedDisplayedFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
};

export default DisplayHandling;
