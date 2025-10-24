


import React from "react";
import Sidebar from "../../components/sidebar.jsx";

const StatCard = ({ title, value, delta, icon }) => (
  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-50 text-indigo-600 mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {delta && (
          <p className={`text-sm mt-1 ${delta.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
            {delta}
          </p>
        )}
      </div>
    </div>
  </div>
);

const RecentRow = ({ session }) => (
  <tr className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{session.title}</td>
    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">{session.teacher}</td>
    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">{session.date}</td>
    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">{session.status}</td>
  </tr>
);

const Dashboard = () => {
  const stats = [
    { title: "Active Students", value: "1,248", delta: "+4.2%", icon: "👩‍🎓" },
    { title: "Active Teachers", value: "84", delta: "+1.1%", icon: "👨‍🏫" },
    { title: "Upcoming Sessions", value: "32", delta: "-0.5%", icon: "📅" },
  ];

  const recent = [
    { title: "Physics 101", teacher: "Dr. Maya", date: "Oct 22, 2025", status: "Scheduled" },
    { title: "Intro to Painting", teacher: "Mr. Arjun", date: "Oct 21, 2025", status: "Completed" },
    { title: "Calculus II", teacher: "Prof. Singh", date: "Oct 20, 2025", status: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />

      <main className="pt-20 pl-0 sm:pl-64 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overview of system activity and key metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">Create Session</button>
              <button className="px-3 py-2 bg-white dark:bg-gray-800 border rounded-md">Export</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((s, i) => (
              <StatCard key={i} title={s.title} value={s.value} delta={s.delta} icon={s.icon} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-3">Attendance (Last 7 days)</h2>
              <div className="h-56 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-600">
                <span className="text-indigo-700 dark:text-indigo-200">[Chart placeholder]</span>
              </div>
            </section>

            <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h3 className="text-md font-medium mb-3">Recent Sessions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 dark:text-gray-300">
                      <th className="px-4 py-2">Session</th>
                      <th className="px-4 py-2">Teacher</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r, i) => (
                      <RecentRow key={i} session={r} />
                    ))}
                  </tbody>
                </table>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
