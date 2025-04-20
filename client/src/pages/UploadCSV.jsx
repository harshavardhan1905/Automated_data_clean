import { useState } from "react";
import axios from "axios"; // Un-commented the axios import

const UploadCSV = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (!title || !file) {
      return alert("Please fill all fields.");
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("csv", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("File uploaded successfully!");
      console.log(res.data); // Log response data for debugging
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-10">
      <div className="bg-gray-100 p-8 rounded shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Upload a CSV File
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Title*</label>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className="block mb-2 font-medium">CSV*</label>
          <input
            type="file"
            accept=".csv"
            className="w-full p-2 mb-4 border rounded"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading} // Disable button while uploading
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
        </form>

        {/* Display message after submission */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadCSV;
