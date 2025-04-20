import { useEffect, useState } from "react";

const DataTable = ({ data, selectedFile }) => {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  const headers = Object.keys(data[0]);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentPageData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [selectedFile]);

  return (
    <div className="w-full max-w-[1120px] mx-auto">
      {/* Fixed size scrollable box */}
      <div className="w-full h-[409px] overflow-x-auto overflow-y-auto border rounded-lg shadow bg-white">
        <table className="min-w-[1110px] text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              {headers.map((key) => (
                <th key={key} className="px-3 py-2 border-b whitespace-nowrap">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {currentPageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {headers.map((key) => (
                  <td
                    key={key}
                    className="px-3 py-2 border-b whitespace-nowrap"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, data.length)} of {data.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>
          <span className="px-3 py-1">{page}</span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
