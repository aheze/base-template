import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Calendar, Book, MessageSquare, Users, LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState({ role: 'student', name: 'John Doe' });
  const [courses, setCourses] = useState([
    { id: 1, name: 'Advanced React', faculty: 'Prof. Smith', slots: 5, enrolled: 0 },
    { id: 2, name: 'Web Design', faculty: 'Dr. Jane', slots: 10, enrolled: 2 },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (course) => {
    if (!cart.includes(course) && course.enrolled < course.slots) {
      setCart([...cart, course]);
      setCourses(courses.map(c => 
        c.id === course.id ? { ...c, enrolled: c.enrolled + 1 } : c
      ));
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(c => c.id !== courseId));
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, enrolled: c.enrolled - 1 } : c
    ));
  };

  const CourseCard = ({ course, inCart = false }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.faculty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Slots: {course.enrolled}/{course.slots}</p>
      </CardContent>
      <CardFooter>
        {inCart ? 
          <Button onClick={() => removeFromCart(course.id)}>Remove</Button> : 
          <Button onClick={() => addToCart(course)} disabled={course.enrolled >= course.slots}>Add to Cart</Button>
        }
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/university-logo.png" alt="University Logo" className="h-8 w-auto mr-4"/>
          <h1 className="text-xl font-bold">University Portal</h1>
        </div>
        <div className="flex items-center">
          <Input placeholder="Search..." className="mr-4" />
          <Button><LogOut className="mr-2" />Logout</Button>
        </div>
      </header>

      <main className="container mx-auto">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome, {user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Check out the latest announcements and upcoming deadlines.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <Button><Check /> Enroll in Courses</Button>
                  <Button><Book /> View Resources</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="courses">
            <h2 className="text-2xl mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
            <h2 className="text-2xl mt-8 mb-4">Your Cart</h2>
            {cart.map(course => <CourseCard key={course.id} course={course} inCart={true} />)}
          </TabsContent>
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Your Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for calendar component */}
                <p>Calendar view goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for messaging system */}
                <p>Messages and communication tools will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="text-center p-4 mt-8 bg-white shadow-md">
        <p>&copy; 2023 University Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;