import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="bg-blue-900 text-white w-64 h-full p-4">
    <h1 className="text-lg font-bold mb-6">Data Processing ToolKit (DPT)</h1>
    <nav className="space-y-4">
      <Link to="/upload" className="block hover:underline">
        Upload CSV
      </Link>
      <Link to="/select" className="block hover:underline">
        Data Preview
      </Link>
      <Link to="/preprocessing" className="block hover:underline">
        Data Preprocessing
      </Link>
      <Link to="/eda" className="block hover:underline">
        Exploratory Data Analysis
      </Link>
      <Link to="/graphs" className="block hover:underline">
        Explore Graphs
      </Link>
    </nav>
  </div>
);

export default Sidebar;
