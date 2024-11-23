import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">University Portal</h1>
    <nav>
      <Button variant="ghost">Dashboard</Button>
      <Button variant="ghost">Calendar</Button>
      <Button variant="ghost">Profile</Button>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-100 p-4 text-center">
    <p>&copy; 2023 University Portal. All rights reserved.</p>
  </footer>
);

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

const Dashboard = ({ user }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Welcome, {user}!</h2>
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <p>New course registration opens next week.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="link">Course Catalog</Button>
        <Button variant="link">Grades</Button>
        <Button variant="link">Schedule</Button>
      </CardContent>
    </Card>
  </div>
);

const CourseCart = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Enter course name"
          />
          <Button onClick={addCourse}>Add</Button>
        </div>
        <ul className="space-y-2">
          {courses.map((course, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              {course}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Timetable = () => (
  <Card>
    <CardHeader>
      <CardTitle>Weekly Schedule</CardTitle>
    </CardHeader>
    <CardContent>
      <table className="w-full">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>9:00 AM</td>
            <td>Math 101</td>
            <td>-</td>
            <td>Math 101</td>
            <td>-</td>
            <td>Math 101</td>
          </tr>
          <tr>
            <td>11:00 AM</td>
            <td>-</td>
            <td>Physics 201</td>
            <td>-</td>
            <td>Physics 201</td>
            <td>-</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </CardContent>
  </Card>
);

const Gradebook = () => (
  <Card>
    <CardHeader>
      <CardTitle>Gradebook</CardTitle>
    </CardHeader>
    <CardContent>
      <table className="w-full">
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Math 101</td>
            <td>A</td>
          </tr>
          <tr>
            <td>Physics 201</td>
            <td>B+</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </CardContent>
  </Card>
);

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm onLogin={handleLogin} />
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard user={user} />
          </TabsContent>
          <TabsContent value="courses">
            <CourseCart />
          </TabsContent>
          <TabsContent value="schedule">
            <Timetable />
          </TabsContent>
          <TabsContent value="grades">
            <Gradebook />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}