import { useEffect, useState } from "react";
import axios from "axios";
import FileSelector from "@/components/FileSelector";
import FileDetails from "@/components/FileDetails";
import DataTable from "@/components/DataTable";

const DataPreview = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [data, setData] = useState([]);

  // Fetch files on initial load
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/files/listfiles")
      .then((res) => setFiles(res.data.files));

    // Check if there's a selected file in localStorage
    const savedFile = localStorage.getItem("selectedFileName");
    if (savedFile) {
      handleSelect(savedFile); // Automatically select the file if it's in localStorage
    }
  }, []);

  const handleSelect = (filename) => {
    setSelectedFile(filename);

    // Store the selected file in localStorage for future use
    localStorage.setItem("selectedFileName", filename);

    axios
      .get(`http://localhost:5001/api/files/${filename}/details`)
      .then((res) => {
        setFileDetails(res.data.details);
        setData(res.data.preview);
      });
  };

  return (
    <div className="flex w-full p-6">
      <div className="w-full max-w-full flex flex-col">
        {/* File Selector */}
        <FileSelector files={files} onSelect={handleSelect} />

        {/* File Details */}
        {fileDetails && <FileDetails details={fileDetails} />}

        {/* Data Table */}
        {data && <DataTable data={data} selectedFile={selectedFile} />}
      </div>
    </div>
  );
};

export default DataPreview;
