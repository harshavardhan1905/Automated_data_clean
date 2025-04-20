import React from "react";

const DataCleaning = ({
  missingHandleMethod, // Changed from imputationMethod to missingHandleMethod
  setMissingHandleMethod, // Changed from setImputationMethod to setMissingHandleMethod
  outlierHandling,
  setOutlierHandling,
}) => {
  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-2xl font-bold">1. Data Cleaning</h1>

      <div className="bg-white text-black p-6 rounded-xl space-y-6 shadow-md w-full">
        {/* Handling Missing Values */}
        <div>
          <label className="block mb-2 font-medium">
            Handling Missing Values
          </label>
          <select
            value={missingHandleMethod} // Updated to use missingHandleMethod
            onChange={(e) => setMissingHandleMethod(e.target.value)} // Updated setter function
            className="w-full p-3 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="mean_mode">Mean + Mode</option>
            <option value="median_mode">Median + Mode</option>
            <option value="knn">KNN Imputation</option>
            <option value="iterative">Iterative Imputation</option>
            <option value="random">Random Imputation</option>
          </select>
        </div>

        {/* Removing Duplicates */}
        <div>
          <label className="block mb-2 font-medium">Removing Duplicates</label>
          <p className="text-sm text-gray-700">
            Duplicate records will be automatically removed.
          </p>
        </div>

        {/* Fixing Formatting */}
        <div>
          <label className="block mb-2 font-medium">
            Fixing Formatting Issues
          </label>
          <p className="text-sm text-gray-700">
            Inconsistent formatting will be automatically corrected.
          </p>
        </div>

        {/* Handling Outliers */}
        <div>
          <label className="block mb-2 font-medium">Handling Outliers</label>
          <select
            value={outlierHandling}
            onChange={(e) => setOutlierHandling(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="drop">Drop rows with outliers</option>
            <option value="cap">Cap to 1st and 99th percentiles</option>
            <option value="median_mode">
              Replace with median (numerical), mode (categorical)
            </option>
            <option value="mean_mode">
              Replace with mean (numerical), mode (categorical)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataCleaning;
