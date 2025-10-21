import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
// import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
// import StudentDashboard from "./pages/Dashboard/StudentDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          {/* <Route path="/dashboard/teacher" element={<TeacherDashboard />} /> */}
          {/* <Route path="/dashboard/student" element={<StudentDashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
