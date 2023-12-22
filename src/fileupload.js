import React, { useState } from "react";
import "./FileUpload.css"; // Import the CSS file for styling

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file has a valid extension
    if (selectedFile && isValidFileType(selectedFile.name)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a valid CSV or JSON file");
    }
  };

  const isValidFileType = (fileName) => {
    const allowedExtensions = [".csv", ".json"];
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    return allowedExtensions.includes("." + fileExtension.toLowerCase());
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
      setFile(null);
    } else {
      setError("Please select a file");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Step 1: Upload File</h2>
      <label htmlFor="file-input">
        Only CSV and JSON files are allowed
        <input
          id="file-input"
          type="file"
          accept=".csv, .json"
          onChange={handleFileChange}
        />
      </label>
      <small className="file-type-label">(Allowed file types: CSV, JSON)</small>
      <button onClick={handleUpload}>Upload</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FileUpload;
