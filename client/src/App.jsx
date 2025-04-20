import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UploadCSV from "./pages/UploadCSV";
import DataPreview from "./pages/DataPreview";
import PreprocessingPage from "./pages/PreprocessingPage"; // Import the new page

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar: Always visible and fixed on large screens */}
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Content area: Takes the remaining space */}
        <div className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/upload" element={<UploadCSV />} />
            <Route path="/select" element={<DataPreview />} />
            <Route path="/preprocessing" element={<PreprocessingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
