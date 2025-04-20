import React, { useState } from "react";
import DataCleaning from "@/components/DataCleaning";
import axios from "axios";
import DataTable from "@/components/DataTable";

const PreprocessingPage = () => {
  const [missingHandleMethod, setMissingHandleMethod] = useState("mean_mode"); // Renamed from imputationMethod
  const [outlierHandling, setOutlierHandling] = useState("drop");
  const [selectedFile, setSelectedFile] = useState(
    localStorage.getItem("selectedFileName")
  );
  const [data, setData] = useState(null);

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const requestData = {
      fileName: selectedFile,
      missingHandleMethod, // Renamed to match the new name
      outlierHandling,
    };

    axios
      .post("http://localhost:5001/api/preprocess", requestData)
      .then((response) => {
        setData(response.data); // Assuming the response contains the processed data
      })
      .catch((error) => {
        console.error("Error processing data:", error);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Preprocessing Data</h1>

      {/* Data Cleaning Component */}
      <DataCleaning
        missingHandleMethod={missingHandleMethod} // Updated prop name
        setMissingHandleMethod={setMissingHandleMethod} // Updated setter function
        outlierHandling={outlierHandling}
        setOutlierHandling={setOutlierHandling}
      />

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          Submit & Clean Data
        </button>
      </div>

      {/* Render Data Table if available */}
      {data && <DataTable data={data} />}
    </div>
  );
};

export default PreprocessingPage;
