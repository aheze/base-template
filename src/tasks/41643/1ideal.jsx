// Import React and UI components
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Main App Component
function App() {
  const [users, setUsers] = useState([]); // Store registered users
  const [user, setUser] = useState(null); // Logged-in user
  const [currentPage, setCurrentPage] = useState("home"); // Current page state
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled courses
  const [availableCourses] = useState([
    { id: 1, title: "Mathematics 101" },
    { id: 2, title: "Physics Basics" },
    { id: 3, title: "Creative Writing" },
    { id: 4, title: "Intro to Programming" },
  ]); // Static list of available courses

  // Handle user signup
  const handleSignup = (newUser) => {
    setUsers([...users, newUser]);
    setUser(newUser);
    setCurrentPage("dashboard");
  };

  // Handle user login
  const handleLogin = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      setEnrolledCourses(existingUser.enrolledCourses || []);
      setCurrentPage("dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  // Enroll user in a course
  const enrollInCourse = (course) => {
    if (!enrolledCourses.find((c) => c.id === course.id)) {
      const updatedCourses = [...enrolledCourses, course];
      setEnrolledCourses(updatedCourses);
      setUser({ ...user, enrolledCourses: updatedCourses });
    } else {
      alert("You are already enrolled in this course.");
    }
  };

  // Navigation handler
  const navigate = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <Header user={user} navigate={navigate} />
      <main className="max-w-5xl mx-auto p-6">
        {currentPage === "home" && <Home navigate={navigate} />}
        {currentPage === "signup" && <Signup onSignup={handleSignup} />}
        {currentPage === "login" && <Login onLogin={handleLogin} />}
        {currentPage === "dashboard" && (
          <Dashboard user={user} enrolledCourses={enrolledCourses} />
        )}
        {currentPage === "courses" && (
          <Courses
            availableCourses={availableCourses}
            enrolledCourses={enrolledCourses}
            enrollInCourse={enrollInCourse}
          />
        )}
        {currentPage === "profile" && <Profile user={user} />}
      </main>
      <Footer />
    </div>
  );
}

// Header Component
function Header({ user, navigate }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10 text-gray-800">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-purple-600">University Portal</h1>
        <nav className="flex gap-4">
          <button onClick={() => navigate("home")} className="hover:underline">
            Home
          </button>
          {user ? (
            <>
              <button
                onClick={() => navigate("dashboard")}
                className="hover:underline"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("courses")}
                className="hover:underline"
              >
                Courses
              </button>
              <button
                onClick={() => navigate("profile")}
                className="hover:underline"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("home")}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("signup")}
                className="hover:underline"
              >
                Signup
              </button>
              <button
                onClick={() => navigate("login")}
                className="hover:underline"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4">
      <div className="max-w-5xl mx-auto text-center">
        <p>&copy; 2024 University Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

// Home Component
function Home({ navigate }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to University Portal</h1>
      <p className="mb-6">Your one-stop solution for all academic needs.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("signup")}
          className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("login")}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

// Signup Component
function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    semester: "Fall 2024",
    enrolledCourses: [],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(formData);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <select
            name="semester"
            className="w-full p-2 border rounded"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
          </select>
          <button
            type="submit"
            className="py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Signup
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

// Login Component
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

// Dashboard Component
function Dashboard({ user, enrolledCourses }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <h3 className="mt-6 text-xl font-semibold">Your Enrolled Courses:</h3>
      <ul>
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <li key={course.id} className="text-blue-300">
              {course.title}
            </li>
          ))
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </ul>
    </div>
  );
}

// Courses Component
function Courses({ availableCourses, enrolledCourses, enrollInCourse }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {availableCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Slots available: Unlimited</p>
            </CardContent>
            <CardFooter>
              {enrolledCourses.find((c) => c.id === course.id) ? (
                <button
                  disabled
                  className="py-2 px-4 bg-gray-500 text-white rounded cursor-not-allowed"
                >
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={() => enrollInCourse(course)}
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Enroll
                </button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Profile Component
function Profile({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Role: {user.role}</li>
        <li>Semester: {user.semester}</li>
      </ul>
    </div>
  );
}

export default App;
