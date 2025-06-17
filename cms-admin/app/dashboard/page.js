// cms-admin/app/dashboard/page.js
"use client"; // This is a client component

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // For local loading state on logout button

export default function DashboardPage() {
  const { currentUser, logout } = useAuth(); // Get currentUser and logout function
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false); // Local state for logout button loading

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      // No immediate router.push here, ClientLayoutWrapper handles redirect to /login
    } catch (error) {
      console.error("Error logging out:", error);
      // You might want to display an error message on the dashboard here
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome, Admin</h2>
        {currentUser && (
          <p className="text-gray-600 mb-4">You are logged in as: <span className="font-medium text-indigo-600">{currentUser.email}</span></p>
        )}
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
          
        </div>
      </div>

    </div>
  );
}