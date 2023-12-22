// SpecifyFormat.js
import React, { useState } from "react";
import "./SpecifyFormat.css"; 

const SpecifyFormat = ({ onFormatSubmit }) => {
  const [fileType, setFileType] = useState("");
  const [characterEncoding, setCharacterEncoding] = useState("utf-8");
  const [delimiter, setDelimiter] = useState(",");

  const handleSubmit = () => {
    
    onFormatSubmit({ fileType, characterEncoding, delimiter });
  };

  return (
    <div className="format-container">
      <h2>Step 2: Specify Format</h2>
      <label>
        File Type:
        <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </label>
      <br />
      <label>
        Character Encoding:
        <select
          value={characterEncoding}
          onChange={(e) => setCharacterEncoding(e.target.value)}
        >
          <option value="utf-8">UTF-8</option>
          
        </select>
      </label>
      <br />
      <label>
        Delimiter:
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          
        </select>
      </label>
      <br />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default SpecifyFormat;
