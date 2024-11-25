// Import necessary modules and components
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  // State variables for data management and visualization options
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");

  // Handle file uploads for CSV and JSON data
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      // Process JSON files
      if (file.type === "application/json") {
        const jsonData = JSON.parse(content);
        const headers = Object.keys(jsonData[0]);
        setData(jsonData);
        setHeaders(headers);
      }
      // Process CSV files
      else if (file.type === "text/csv") {
        const rows = content.split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const parsedData = rows.slice(1).map((row) =>
          headers.reduce((acc, header, i) => {
            acc[header] = row[i];
            return acc;
          }, {})
        );
        setData(parsedData);
        setHeaders(headers);
      }
    };

    reader.readAsText(file);
  };

  // Render the selected chart type
  const renderChart = () => {
    if (!selectedX || !selectedY || data.length === 0) return null;

    const xValues = data.map((item) => item[selectedX]);
    const yValues = data.map((item) => +item[selectedY]);
    const maxValue = Math.max(...yValues);

    // Render a bar chart
    if (chartType === "bar") {
      return (
        <svg width="400" height="300" className="bg-gray-100">
          {yValues.map((value, index) => (
            <rect
              key={index}
              x={index * 40}
              y={300 - (value / maxValue) * 250}
              width="30"
              height={(value / maxValue) * 250}
              fill="steelblue"
              className="transition-transform transform hover:scale-105"
            />
          ))}
          <text
            x="200"
            y="290"
            textAnchor="middle"
            fill="black"
            fontSize="12px"
          >
            {selectedX}
          </text>
          <line
            x1="0"
            y1="300"
            x2="400"
            y2="300"
            stroke="black"
            strokeWidth="1"
          />
        </svg>
      );
    }

    // Render a line chart
    else if (chartType === "line") {
      const points = xValues.map((_, index) => {
        const x = (index / xValues.length) * 400;
        const y = 300 - (yValues[index] / maxValue) * 250;
        return `${x},${y}`;
      });

      return (
        <svg width="400" height="300" className="bg-gray-100">
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke="steelblue"
            strokeWidth="2"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">Data Visualization App</h1>
        <p className="text-gray-600">
          Upload your data and explore insights visually
        </p>
      </header>

      {/* File Upload Section */}
      <Card className="mb-6 max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Upload Your Data</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept=".csv, .json"
            className="block w-full text-sm text-gray-600 border rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500"
            onChange={handleFileUpload}
          />
        </CardContent>
      </Card>

      {/* Data Preview Section */}
      {data.length > 0 && (
        <Card className="mb-6 max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-left text-gray-600">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 bg-gray-200 text-gray-800"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header) => (
                        <td key={header} className="px-4 py-2 border-b">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chart Customization Section */}
      {data.length > 0 && (
        <Card className="mb-6 max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Customize Your Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Select X-Axis</label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value)}
                >
                  <option value="">-- Select X-Axis --</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Select Y-Axis</label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value)}
                >
                  <option value="">-- Select Y-Axis --</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Select Chart Type
                </label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                </select>
              </div>
            </div>
          </CardContent>
          <div className="text-center p-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              onClick={renderChart}
            >
              Update Chart
            </button>
          </div>
        </Card>
      )}

      {/* Chart Display Section */}
      {data.length > 0 && (
        <Card className="mb-6 max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent>{renderChart()}</CardContent>
        </Card>
      )}
    </div>
  );
}
