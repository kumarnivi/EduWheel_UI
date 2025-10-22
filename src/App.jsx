// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Location from "./pages/Location";
import DashboardLayout from "./Layouts/DashboardLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Dashboard Layout — contains Navbar + Sidebar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/locations" element={<Location />} />

          </Route>

          {/* Other Routes outside the dashboard layout */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
