import { Card, CardContent } from "./ui/card";

const FileDetails = ({ details }) => {
  if (!details) {
    return <div className="text-center text-gray-500">No details</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-600 text-white">
        <CardContent className="p-4">
          <p className="text-sm">Selected File Name</p>
          <h3 className="text-lg font-bold">{details.name}</h3>
        </CardContent>
      </Card>
      <Card className="bg-yellow-500 text-white">
        <CardContent className="p-4">
          <p className="text-sm">Rows & Columns</p>
          <h3 className="text-lg font-bold">
            {details.rows} & {details.columns}
          </h3>
        </CardContent>
      </Card>
      <Card className="bg-cyan-600 text-white">
        <CardContent className="p-4">
          <p className="text-sm">Duplicate Rows Count</p>
          <h3 className="text-lg font-bold">{details.duplicates}</h3>
        </CardContent>
      </Card>
      <Card className="bg-red-600 text-white">
        <CardContent className="p-4">
          <p className="text-sm">Count of Null Values</p>
          <h3 className="text-lg font-bold">{details.nulls}</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileDetails;
