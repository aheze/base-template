import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Utility function to parse different file types
const parseFile = (file, callback) => {
  if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      callback(XLSX.utils.sheet_to_json(worksheet, {header: 1}));
    };
    reader.readAsArrayBuffer(file);
  } else if (file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (e) => callback(JSON.parse(e.target.result));
    reader.readAsText(file);
  } else if (file.type === 'text/csv') {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => callback(results.data),
    });
  }
};

// Chart component placeholder (you'd integrate actual charting library here)
const Chart = ({ type, data }) => (
  <div className="h-64 border border-gray-200 p-4">
    <h3>{type} Chart Placeholder</h3>
    {/* Here you would render your chart with data */}
  </div>
);

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('preview');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
      parseFile(acceptedFiles[0], setData);
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.csv,.xlsx,.xls,.json'});

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Visualization App</CardTitle>
          <CardDescription>Upload your dataset to start visualizing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div {...getRootProps()} className="dropzone border-2 border-dashed border-gray-300 p-4 text-center mb-4">
            <input {...getInputProps()} />
            {
              isDragActive ? 
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div>
          {file && <p>File: {file.name}</p>}
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Table>
                <TableHeader>
                  {data.length > 0 && data[0].map((header, idx) => <TableHead key={idx}>{header}</TableHead>)}
                </TableHeader>
                <TableBody>
                  {data.slice(1).map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      {row.map((cell, cellIdx) => <TableCell key={cellIdx}>{cell}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="visualize">
              <Chart type="Bar" data={data} />
              {/* Add more chart types here */}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setActiveTab('preview')}>Back to Preview</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;