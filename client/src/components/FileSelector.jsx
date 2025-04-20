const FileSelector = ({ files, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select a file:
      </label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full max-w-md p-3 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      >
        <option value="">-- Choose a file --</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file.length > 50 ? file.slice(0, 50) + "..." : file}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FileSelector;
