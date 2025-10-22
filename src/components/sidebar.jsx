import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard/admin" },
    { name: "Locations", path: "/dashboard/admin/locations" },
    { name: "Inbox", path: "/dashboard/admin/inbox" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Products", path: "/dashboard/admin/products" },
    { name: "Sign In", path: "/sign-in" },
    { name: "Sign Up", path: "/sign-up" },
  ];

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform
                 -translate-x-full sm:translate-x-0
                 bg-gradient-to-b from-purple-900 via-purple-800 to-black text-white shadow-lg"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-purple-700 text-white shadow-inner"
                      : "text-gray-300 hover:bg-purple-700 hover:text-white"
                  }`
                }
              >
                <span className="flex-1 ms-3 whitespace-nowrap">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
