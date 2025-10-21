import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
// import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
// import StudentDashboard from "./pages/Dashboard/StudentDashboard";

function App() {
<<<<<<< HEAD
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
=======


  return (
    <>
      <div>
       <h1>EduWheel project </h1>
      </div>
    </>
  )
>>>>>>> 9aa3476b56b3f16b2220759778ec6e5cc1ee9013
}

export default App;
