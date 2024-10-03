// App.jsx
import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle,
  CardFooter, Button, Input, Select, Label,
  Table, TableBody, TableCell, TableHead, TableHeader,
  TableRow, Alert
} from "@/components/ui";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";

const defaultGrades = {
  '4.0': { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 },
  '5.0': { A: 5.0, B: 4.0, C: 3.0, D: 2.0, F: 0.0 }
};

function App() {
  const [userInfo, setUserInfo] = useState({ name: '', school: '', level: '' });
  const [gradingScale, setGradingScale] = useState('4.0');
  const [grades, setGrades] = useState(defaultGrades[gradingScale]);
  const [courses, setCourses] = useState(Array(5).fill({ course: '', credits: '', grade: '' }));
  const [estimate, setEstimate] = useState({ coursesLeft: 0, currentGPA: 0, currentCredits: 0, targetGPA: 0 });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const calculateGPA = () => {
    let totalCredits = 0, totalGradePoints = 0;
    courses.forEach(({ credits, grade }) => {
      if (grade && credits) {
        totalGradePoints += grades[grade] * parseInt(credits, 10);
        totalCredits += parseInt(credits, 10);
      }
    });
    return (totalGradePoints / totalCredits).toFixed(2) || '0.00';
  };

  const addCourse = () => {
    setCourses([...courses, { course: '', credits: '', grade: '' }]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({
      userInfo,
      gpa: calculateGPA(),
      courses: courses.filter(c => c.course)
    })], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${userInfo.name}-GPA-report.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const estimateGPA = () => {
    const { currentGPA, currentCredits, targetGPA, coursesLeft } = estimate;
    const neededPoints = (targetGPA * (parseInt(currentCredits) + coursesLeft)) - (currentGPA * currentCredits);
    const neededGPA = neededPoints / coursesLeft;
    return neededGPA > parseFloat(gradingScale) ? 'Not possible' : neededGPA.toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>GPA Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['name', 'school', 'level'].map(field => (
              <div key={field}>
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input name={field} value={userInfo[field]} onChange={handleUserInput} />
              </div>
            ))}
          </div>
          <Select onValueChange={setGradingScale}>
            <option value="4.0">4.0 Scale</option>
            <option value="5.0">5.0 Scale</option>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Courses</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell><Input value={course.course} onChange={(e) => updateCourse(index, 'course', e.target.value)} /></TableCell>
                <TableCell><Input type="number" value={course.credits} onChange={(e) => updateCourse(index, 'credits', e.target.value)} /></TableCell>
                <TableCell>
                  <Select value={course.grade} onValueChange={(value) => updateCourse(index, 'grade', value)}>
                    {Object.keys(grades).map(grade => <option key={grade} value={grade}>{grade}</option>)}
                  </Select>
                </TableCell>
                <TableCell><Button variant="destructive" onClick={() => removeCourse(index)}><TrashIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter>
          <Button onClick={addCourse}><PlusIcon /> Add Course</Button>
        </CardFooter>
      </Card>

      <Button onClick={downloadReport}>Download GPA Report</Button>

      <Card className="mt-4">
        <CardTitle>Estimate Required GPA</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {['coursesLeft', 'currentGPA', 'currentCredits', 'targetGPA'].map(field => (
              <div key={field}>
                <Label>{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <Input type="number" value={estimate[field]} onChange={(e) => setEstimate({ ...estimate, [field]: e.target.value })} />
              </div>
            ))}
          </div>
          <Alert className="mt-2">You need a GPA of: {estimateGPA()}</Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;