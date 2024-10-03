import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select, SelectItem, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";

const DEFAULT_GRADES = {
  'A': { 4.0: 4.0, 5.0: 5.0 },
  'B': { 4.0: 3.0, 5.0: 4.0 },
  'C': { 4.0: 2.0, 5.0: 3.0 },
  'D': { 4.0: 1.0, 5.0: 2.0 },
  'F': { 4.0: 0.0, 5.0: 0.0 },
};

function GradePointEditor({ grades, setGrades }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(grades).map(([grade, points]) => (
        <div key={grade}>
          <label>{grade}</label>
          <Input
            type="number"
            value={points['4.0']}
            onChange={(e) => setGrades(prev => ({ ...prev, [grade]: { ...prev[grade], '4.0': parseFloat(e.target.value) } }))}
          />
          <Input
            type="number"
            value={points['5.0']}
            onChange={(e) => setGrades(prev => ({ ...prev, [grade]: { ...prev[grade], '5.0': parseFloat(e.target.value) } }))}
          />
        </div>
      ))}
    </div>
  );
}

function GPACalculator() {
  const [user, setUser] = useState({ name: '', school: '', level: '' });
  const [scale, setScale] = useState('4.0');
  const [grades, setGrades] = useState(DEFAULT_GRADES);
  const [courses, setCourses] = useState([{ course: '', credits: '', grade: '' }]);
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [remainingCourses, setRemainingCourses] = useState(1);

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(course => {
      if (course.credits && course.grade) {
        const points = grades[course.grade][scale] * course.credits;
        totalPoints += points;
        totalCredits += parseFloat(course.credits);
      }
    });
    return (totalPoints / totalCredits).toFixed(2) || '0.00';
  };

  const estimateRequiredGPA = () => {
    const currentTotalPoints = currentGPA * currentCredits;
    const neededPoints = targetGPA * (parseInt(currentCredits) + remainingCourses * 3) - currentTotalPoints;
    const requiredGPA = neededPoints / (remainingCourses * 3);
    return requiredGPA > parseFloat(scale) ? 'Not possible' : requiredGPA.toFixed(2);
  };

  const addCourse = () => setCourses(prev => [...prev, { course: '', credits: '', grade: '' }]);

  const deleteCourse = (index) => {
    setCourses(prev => prev.filter((_, i) => i !== index));
  };

  const downloadReport = () => {
    const data = courses.map(c => ({
      Course: c.course,
      Credits: c.credits,
      Grade: c.grade,
      'Grade Points': c.grade ? grades[c.grade][scale] * c.credits : 0
    }));
    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gpa_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-4 sm:p-6">
      <CardHeader>
        <CardTitle>GPA Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="School"
            value={user.school}
            onChange={(e) => setUser(prev => ({ ...prev, school: e.target.value }))}
          />
          <Input
            placeholder="Level"
            value={user.level}
            onChange={(e) => setUser(prev => ({ ...prev, level: e.target.value }))}
          />
        </div>

        <GradePointEditor grades={grades} setGrades={setGrades} />

        <Select value={scale} onValueChange={setScale}>
          <SelectItem value="4.0">4.0 Scale</SelectItem>
          <SelectItem value="5.0">5.0 Scale</SelectItem>
        </Select>

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
                <TableCell><Input value={course.course} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].course = e.target.value;
                  setCourses(newCourses);
                }} /></TableCell>
                <TableCell><Input type="number" value={course.credits} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].credits = e.target.value;
                  setCourses(newCourses);
                }} /></TableCell>
                <TableCell>
                  <Select value={course.grade} onChange={(value) => {
                    const newCourses = [...courses];
                    newCourses[index].grade = value;
                    setCourses(newCourses);
                  }}>
                    {Object.keys(grades).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </Select>
                </TableCell>
                <TableCell><Button variant="destructive" onClick={() => deleteCourse(index)}>x</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-2" onClick={addCourse}>Add Course</Button>
        <Button className="mt-2" onClick={() => {
          const gpa = calculateGPA();
          alert(`Your GPA is: ${gpa}`);
          downloadReport();
        }}>Calculate & Download Report</Button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">GPA Estimate for Remaining Courses</h3>
          <Input
            type="number"
            placeholder="Current GPA"
            value={currentGPA}
            onChange={(e) => setCurrentGPA(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Current Credits"
            value={currentCredits}
            onChange={(e) => setCurrentCredits(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Target GPA"
            value={targetGPA}
            onChange={(e) => setTargetGPA(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Remaining Courses"
            value={remainingCourses}
            onChange={(e) => setRemainingCourses(e.target.value)}
          />
          <p>Required GPA for remaining courses: {estimateRequiredGPA()}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return <GPACalculator />;
}