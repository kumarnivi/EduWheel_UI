import React, { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center p-2 text-gray-600 rounded-lg sm:hidden hover:bg-gray-100"
            onClick={() =>
              document
                .getElementById("logo-sidebar")
                .classList.toggle("-translate-x-full")
            }
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">E</div>
            <span className="self-center text-lg font-semibold">EduWheel</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
            <input className="bg-transparent outline-none w-40" placeholder="Search" />
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm bg-indigo-600 rounded-full p-0.5 focus:ring-2 focus:ring-indigo-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-gray-500">admin@eduwheel.local</p>
                </div>
                <hr className="border-gray-100 dark:border-gray-700" />
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
