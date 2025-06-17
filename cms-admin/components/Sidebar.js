// cms-admin/components/Sidebar.js
"use client"; // This component will use client-side hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // For active link styling
// No longer need useRouter, useAuth, useState, useEffect for logout here

export default function Sidebar() {
  const pathname = usePathname();

  // Updated navItems: Removed Screen Edit links, assuming Dashboard, Add Rooms, Bookings, Notifications
  // Adjust these based on your actual dashboard navigation structure
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Matches Screen", href: "/matches-edit" }, 
    { name: "Likes Screen", href: "/likes-edit" }, 
    
  ];

  return (
    <aside className="w-64 bg-white text-gray-800 p-6 shadow-md flex flex-col justify-between border-r border-gray-200">
      {/* This div will hold the scrollable navigation part */}
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {/* Admin Panel Header */}
        <h2 className="text-xl font-bold mb-8 border-b pb-4 text-red-600 sticky top-0 bg-white z-10">Admin Panel</h2>

        {/* Navigation Links */}
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.href} className={`flex items-center p-3 rounded-lg transition-colors duration-200
                  ${pathname === item.href ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100'}
                `}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Removed the entire Profile Section with username, logout, change password */}
    </aside>
  );
}