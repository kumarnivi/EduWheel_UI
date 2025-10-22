// src/layouts/DashboardLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
