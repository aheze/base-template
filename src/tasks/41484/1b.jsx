import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mocked visualization component (replace with actual chart library)
const Chart = ({ type, data, options }) => (
  <div className="h-64 bg-gray-100 flex items-center justify-center">
    <p>{type} Chart Placeholder</p>
  </div>
);

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileUpload(content);
    };
    reader.readAsText(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a file here, or click to select a file</p>
      )}
    </div>
  );
};

const DataTable = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {Object.keys(data[0] || {}).map((key) => (
          <TableHead key={key}>{key}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.slice(0, 5).map((row, index) => (
        <TableRow key={index}>
          {Object.values(row).map((value, i) => (
            <TableCell key={i}>{value}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ChartCustomization = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    title: "",
    xAxis: "",
    yAxis: "",
    color: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: value }));
    onOptionsChange({ ...options, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Chart Title</Label>
        <Input id="title" name="title" value={options.title} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="xAxis">X-Axis Label</Label>
        <Input id="xAxis" name="xAxis" value={options.xAxis} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="yAxis">Y-Axis Label</Label>
        <Input id="yAxis" name="yAxis" value={options.yAxis} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input id="color" name="color" type="color" value={options.color} onChange={handleChange} />
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [chartOptions, setChartOptions] = useState({});

  const handleFileUpload = (content) => {
    try {
      const parsedData = JSON.parse(content);
      setData(parsedData);
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  const handleOptionsChange = (newOptions) => {
    setChartOptions(newOptions);
  };

  const chartTypes = ["bar", "line", "pie", "scatter", "heatmap", "treemap", "histogram"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Visualization App</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upload Data</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload onFileUpload={handleFileUpload} />
        </CardContent>
      </Card>

      {data.length > 0 && (
        <>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={data} />
            </CardContent>
          </Card>

          <Tabs defaultValue="chart" className="mb-4">
            <TabsList>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <Card>
                <CardHeader>
                  <CardTitle>Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Select onValueChange={handleChartTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Chart type={chartType} data={data} options={chartOptions} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="customize">
              <Card>
                <CardHeader>
                  <CardTitle>Customize Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartCustomization onOptionsChange={handleOptionsChange} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-2">
              <Button>Export as PNG</Button>
              <Button>Export as PDF</Button>
              <Button>Export as HTML</Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}