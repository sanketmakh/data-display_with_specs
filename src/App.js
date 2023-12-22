
import React, { useEffect, useState } from 'react';

import FileUpload from './fileupload';
import SpecifyFormat from './specifyformat';
import DisplayHandling from './displayhandling';


function App() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [characterEncoding, setCharacterEncoding] = useState("");
  const [delimiter, setDelimiter] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedAvailableFields, setSelectedAvailableFields] = useState([]);
  const [selectedDisplayedFields, setSelectedDisplayedFields] = useState([]);
  const [selectedDisplayedFieldsToBeDeleted, setSelectedDisplayedFieldsToBeDeleted] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    if (file) {
      // You can use FileReader to read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File content:', fileContent);

        // You can now process the file content (e.g., parse CSV or JSON)
        reader.readAsText(file);

        let productList =  fileContent;

        const productValues = Object.values(productList.products || {});

        const firstProduct = productValues.length > 0 ? productValues[0] : {};
        // console.log("firstProduct ", firstProduct);

        const fields = firstProduct ? Object.keys(firstProduct) : [];
        // console.log("fields ", fields);

        setAvailableFields(fields);
        setSelectedAvailableFields(fields);

        const orderedData = Object.values(productList)
      .sort((a, b) => b.popularity - a.popularity)
      .map((product) =>
        selectedDisplayedFields.reduce((acc, field) => {
          acc[field] = product[field];
          return acc;
        }, {})
      );

    setTableData(orderedData);
    console.log("tableData ", tableData);


        // console.log("availableFields ", availableFields)
      };
      // reader.readAsText(selectedFile);
      
    }else{
      let productList = [];
      setAvailableFields(["Title", "Page"]);
      setSelectedAvailableFields([]);

      // console.log("availableFields ", availableFields)
    }
  }, [file, selectedDisplayedFields]);
  
  const displayTable = () => {
    if (file) {
      // You can use FileReader to read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File content:', fileContent);

        // You can now process the file content (e.g., parse CSV or JSON)
        reader.readAsText(file);

      };
      // reader.readAsText(selectedFile);
      
    }else{
      console.log("file not available ");
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = () => {
    // Perform any validation if needed
    // onFormatSubmit({ fileType, characterEncoding, delimiter });
  };

  // const handleUpload = () => {
  //   if (file) {
  //     // Perform any validation if needed
  //     // onFileUpload(file);
  //   } else {
  //     alert("Please select a file");
  //   }
  // };

    const handleAddFields = () => {
    if (selectedAvailableFields.length > 0) {
      // Add selected fields to displayed fields
      setSelectedDisplayedFields([...selectedDisplayedFields, ...selectedAvailableFields]);

      // Remove selected fields from available fields
      const remainingAvailableFields = availableFields.filter(
        (field) => !selectedAvailableFields.includes(field)
      );
      setSelectedAvailableFields([]);
      // onDisplaySubmit(remainingAvailableFields);
    }
  };

  const handleRemoveFields = () => {
    if (selectedDisplayedFields.length > 0) {
      // Remove selected fields from displayed fields
      // const remainingDisplayedFields = selectedDisplayedFields.filter(
      //   (field) => !selectedAvailableFields.includes(field)
      // );
      // setSelectedDisplayedFields([]);
      // onDisplaySubmit(remainingDisplayedFields);

      // Get the selected fields to be removed
      // const selectedFieldsToRemove = selectedDisplayedFields.slice();
      const selectedFieldsToRemove = selectedDisplayedFieldsToBeDeleted.slice();

      // Remove the selected fields from the selectedDisplayedFields state
      setSelectedDisplayedFields(
        selectedDisplayedFields.filter((field) => !selectedFieldsToRemove.includes(field))
      );

    }
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    if (file) {
      // You can use FileReader to read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File content:', fileContent);
        const parsedContent = JSON.parse(fileContent);

        // You can now process the file content (e.g., parse CSV or JSON)
        let productList =  parsedContent.products;
        console.log("productList ", productList);

        const productValues = Object.values(productList || {});
        console.log("productValues ", productValues);
  
        const firstProduct = productValues.length > 0 ? productValues[0] : {};
        console.log("firstProduct ", firstProduct);
  
        const fields = firstProduct ? Object.keys(firstProduct) : [];
        console.log("fields ", fields);
  
        setAvailableFields(fields);
        setSelectedAvailableFields(fields);
  
        console.log("availableFields ", availableFields)

        
        let orderedData = Object.values(productList)
        .sort((a, b) => b.popularity - a.popularity)
        .map((product) =>{
          

          return product;
        }
          // selectedDisplayedFields.reduce((acc, field) => {
          //   acc[field] = product[field];
          //   return acc;
          // }, {})
        );

      setTableData(orderedData);
      console.log("tableData ", tableData);
      
      };
      // reader.readAsText(selectedFile);
      reader.readAsText(file);

    }
  };


  return (
    <div className="App">
      {/* <FileUpload onFileUpload = {handleUpload} /> */}
      <div>
        <h2>Step 1: Upload File</h2>
        <input type="file" accept=".csv, .json" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* <SpecifyFormat/> */}
      <div>
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
          </select>
        </label>
        <br />
        <label>
          Delimiter:
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
          </select>
        </label>
        <br />
        <button onClick={handleSubmit}>Next</button>
      </div>

      {/* <DisplayHandling className="displayHandling" availableFields={["A", "B", "C", "D"]} onDisplaySubmit="" /> */}
    <div>
      <h2>Step 3: Display Handling</h2>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          <label>Available Fields:</label>
        </div>
        <div>         </div>
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
              // setSelectedDisplayedFields(Array.from(e.target.selectedOptions, (option) => option.value))
              setSelectedDisplayedFieldsToBeDeleted(Array.from(e.target.selectedOptions, (option) => option.value))
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

    <br />
    <button onClick={() => displayTable()}>Display Table</button>

    <h2>Table</h2>
    <table>
      <thead>
        <tr>
          {selectedDisplayedFields.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {selectedDisplayedFields.map((field) => (
              <td key={field}>{row[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>


    </div>
  );
}

export default App;
