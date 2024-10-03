import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

const UserInfoDisplay = ({ name, school, level, gradingScale }) => (
  <Card className="w-full md:w-64 md:float-right md:ml-4 mb-4">
    <CardHeader>
      <CardTitle>User Info</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Name: {name}</p>
      <p>School: {school}</p>
      <p>Level: {level}</p>
      <p>Scale: {gradingScale}</p>
    </CardContent>
  </Card>
);

const UserInfoForm = ({ name, school, level, gradingScale, onInputChange, onNext, error }) => (
  <Card className="w-full max-w-md mx-auto bg-white shadow-md">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold text-gray-800">User Information</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <Input
          placeholder="School"
          value={school}
          onChange={(e) => onInputChange('school', e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <Input
          placeholder="Level"
          value={level}
          onChange={(e) => onInputChange('level', e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <Select
          value={gradingScale}
          onValueChange={(value) => onInputChange('gradingScale', value)}
        >
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
            <SelectValue placeholder="Select Grading Scale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4.0">4.0 Scale</SelectItem>
            <SelectItem value="5.0">5.0 Scale</SelectItem>
          </SelectContent>
        </Select>
        {error && (
          <Alert variant="destructive" className="bg-red-50 border border-red-200 text-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={onNext}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Next
        </Button>
      </div>
    </CardContent>
  </Card>
);

const GradePointTable = ({ gradePoints, onUpdate }) => {
  const [localGradePoints, setLocalGradePoints] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLocalGradePoints(gradePoints);
  }, [gradePoints]);

  const handleInputChange = (grade, value) => {
    setLocalGradePoints(prev => ({
      ...prev,
      [grade]: Number(value)
    }));
  };

  const handleSubmit = () => {
    onUpdate(localGradePoints);
    setSuccessMessage('Grade points updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Grade Point Values</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700 w-1/4">Grade</TableHead>
              <TableHead className="text-gray-700 w-3/4">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(localGradePoints).map(([grade, points]) => (
              <TableRow key={grade}>
                <TableCell className="font-medium text-gray-800">{grade}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={points}
                    onChange={(e) => handleInputChange(grade, e.target.value)}
                    className="w-20 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Update Grade Points
        </Button>
        {successMessage && (
          <div className="mt-4 flex items-center text-green-500">
            <span>{successMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const GradeRow = ({ course, credits, grade, gradingScale, onDelete, onChange }) => {
  const gradeOptions = gradingScale === '5.0' ? ['A', 'B', 'C', 'D', 'E', 'F'] : ['A', 'B', 'C', 'D', 'F'];

  return (
    <TableRow>
      <TableCell>
        <Input
          value={course}
          onChange={(e) => onChange('course', e.target.value)}
          className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Course name"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={credits}
          onChange={(e) => onChange('credits', e.target.value)}
          className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Credits"
        />
      </TableCell>
      <TableCell>
        <Select value={grade} onValueChange={(value) => onChange('grade', value)}>
          <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Button
          onClick={onDelete}
          variant="ghost"
          className="p-2 hover:bg-red-100 text-red-500 rounded-full transition duration-300 ease-in-out"
        >
          x
        </Button>
      </TableCell>
    </TableRow>
  );
};

const EstimateGPASection = ({ currentGPA, currentCredits, targetGPA, coursesLeft, gradingScale, onEstimate, estimatedGPA, isAchievable }) => {
  const maxGPA = Number(gradingScale);
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Estimate Required GPA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="number" placeholder="Current GPA" value={currentGPA} onChange={(e) => onEstimate('currentGPA', e.target.value)} />
          <Input type="number" placeholder="Current Credits" value={currentCredits} onChange={(e) => onEstimate('currentCredits', e.target.value)} />
          <Input type="number" placeholder="Target GPA" value={targetGPA} onChange={(e) => onEstimate('targetGPA', e.target.value)} />
          <Input type="number" placeholder="Courses Left" value={coursesLeft} onChange={(e) => onEstimate('coursesLeft', e.target.value)} />
          <Button onClick={() => onEstimate('calculate')} className="w-full">Calculate Required GPA</Button>
        </div>
        {estimatedGPA !== null && (
          <div className="mt-4">
            {isAchievable ? (
              <p className="text-lg font-semibold">
                Minimum cumulative GPA needed for remaining courses: {estimatedGPA}
              </p>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  Not possible
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    school: '',
    level: '',
    gradingScale: '4.0'
  });
  const [showGpaCalculator, setShowGpaCalculator] = useState(false);
  const [showEstimateGPA, setShowEstimateGPA] = useState(false);
  const [error, setError] = useState('');
  const [rows, setRows] = useState(() =>
    Array(5).fill(null).map(() => ({ course: '', credits: '', grade: '' }))
  );
  const [calculatedGPA, setCalculatedGPA] = useState(null);
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [coursesLeft, setCoursesLeft] = useState('');
  const [estimatedGPA, setEstimatedGPA] = useState(null);
  const [isAchievable, setIsAchievable] = useState(true);
  const [gradePoints, setGradePoints] = useState({});

  useEffect(() => {
    const scale = Number(userInfo.gradingScale);
    const defaultPoints = scale === 4.0 ?
      { A: 4, B: 3, C: 2, D: 1, F: 0 } :
      { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    setGradePoints(defaultPoints);
  }, [userInfo.gradingScale]);

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleNext = () => {
    if (userInfo.name && userInfo.school && userInfo.level) {
      setShowGpaCalculator(true);
    } else {
      setError("Please fill in all fields");
    }
  };

  const handleGradePointUpdate = (newGradePoints) => {
    setGradePoints(newGradePoints);
  };

  const addRow = () => {
    setRows(prevRows => [...prevRows, { course: '', credits: '', grade: '' }]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) setRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const updateRow = (index, field, value) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return newRows;
    });
  };

  const calculateGPA = () => {
    let totalCredits = rows.reduce((sum, row) => sum + Number(row.credits || 0), 0);
    let totalGradePoints = rows.reduce((sum, row) => {
      let gradePoint = gradePoints[row.grade.toUpperCase()] || 0;
      return sum + (gradePoint * Number(row.credits || 0));
    }, 0);

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setCalculatedGPA(gpa);
    return gpa;
  };

  const downloadReport = () => {
    const data = [
      ['Course', 'Credits', 'Grade', 'Grade Points'],
      ...rows.filter(row => row.course || row.credits || row.grade).map(row => {
        const gradePoint = gradePoints[row.grade.toUpperCase()] || 0;
        return [
          row.course || 'N/A',
          row.credits || 'N/A',
          row.grade || 'N/A',
          row.credits ? (gradePoint * Number(row.credits)).toFixed(2) : 'N/A'
        ];
      }),
      [],
      ['Cumulative GPA', calculatedGPA]
    ];
    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${userInfo.name}_GPA_Report.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleEstimateGPA = (field, value) => {
    if (field === 'calculate') {
      const currentTotalPoints = Number(currentGPA) * Number(currentCredits);
      const targetTotalPoints = Number(targetGPA) * (Number(currentCredits) + Number(coursesLeft) * 3); // Assumes 3 credits per course
      const requiredPoints = targetTotalPoints - currentTotalPoints;
      const requiredGPA = requiredPoints / (Number(coursesLeft) * 3);

      const maxPossibleGPA = Number(userInfo.gradingScale);

      if (requiredGPA <= maxPossibleGPA && requiredGPA >= 0) {
        setEstimatedGPA(requiredGPA.toFixed(2));
        setIsAchievable(true);
      } else {
        setEstimatedGPA(0);
        setIsAchievable(false);
      }
    } else {
      switch (field) {
        case 'currentGPA': setCurrentGPA(value); break;
        case 'currentCredits': setCurrentCredits(value); break;
        case 'targetGPA': setTargetGPA(value); break;
        case 'coursesLeft': setCoursesLeft(value); break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">GPA Calculator</h1>
          {showGpaCalculator && (
            <Button
              onClick={() => setShowEstimateGPA(!showEstimateGPA)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              {showEstimateGPA ? 'Back to Calculator' : 'Estimate GPA'}
            </Button>
          )}
        </nav>
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          {!showGpaCalculator ? (
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-7/12 p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-4">User Information</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <UserInfoForm
                    {...userInfo}
                    onInputChange={handleUserInfoChange}
                    onNext={handleNext}
                    error={error}
                  />
                </CardContent>
              </div>
              <div className="w-full lg:w-5/12 bg-gray-50 p-6 lg:border-l lg:border-gray-200">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Grade Point Scale</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <GradePointTable
                    gradePoints={gradePoints}
                    onUpdate={handleGradePointUpdate}
                  />
                </CardContent>
              </div>
            </div>
          ) : showEstimateGPA ? (
            <CardContent>
              <EstimateGPASection
                currentGPA={currentGPA}
                currentCredits={currentCredits}
                targetGPA={targetGPA}
                coursesLeft={coursesLeft}
                gradingScale={userInfo.gradingScale}
                onEstimate={handleEstimateGPA}
                estimatedGPA={estimatedGPA}
                isAchievable={isAchievable}
              />
            </CardContent>
          ) : (
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-700">Course</TableHead>
                          <TableHead className="text-gray-700">Credits</TableHead>
                          <TableHead className="text-gray-700">Grade</TableHead>
                          <TableHead className="text-gray-700"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row, index) => (
                          <GradeRow
                            key={index}
                            {...row}
                            gradingScale={userInfo.gradingScale}
                            onDelete={() => deleteRow(index)}
                            onChange={(field, value) => updateRow(index, field, value)}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex justify-between mt-4">
                      <Button onClick={addRow} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">Add Row</Button>
                      <Button onClick={calculateGPA} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">Calculate GPA</Button>
                    </div>
                    {calculatedGPA !== null && (
                      <div className="flex justify-between items-center mt-6 bg-blue-50 p-4 rounded-lg">
                        <p className="text-xl font-semibold text-blue-800">Cumulative GPA: {calculatedGPA}</p>
                        <Button onClick={downloadReport} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">Download Report</Button>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-1">
                    <UserInfoDisplay {...userInfo} />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default App;