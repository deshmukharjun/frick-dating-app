// cms-admin/components/ClientLayoutWrapper.js
"use client"; // This component MUST be a client component

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Path relative to components folder
import Header from './Header'; // Path relative to components folder
import Sidebar from './Sidebar'; // Path relative to components folder

export default function ClientLayoutWrapper({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before rendering auth-dependent logic
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state until auth is determined on client
  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        Loading authentication...
      </div>
    );
  }

  // === Auth/Redirect Logic ===
  // These redirects happen on the client-side.
  // For full server-side protection, consider Next.js Middleware.

  // If not logged in AND not on the login page, redirect to login
  if (!currentUser && window.location.pathname !== '/login') {
     redirect('/login');
     return null;
  }

  // If logged in BUT not an admin AND not on the access-denied page, redirect
  if (currentUser && !isAdmin && window.location.pathname !== '/access-denied') {
    redirect('/access-denied');
    return null;
  }

  // === Render UI based on Auth Status ===

  // If user is logged in AND is an admin: Render the full admin dashboard layout
  if (currentUser && isAdmin) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          {/* This div stretches to fill remaining height after Header */}
          {/* It contains the Sidebar and the main content area */}
          <div className="flex flex-grow overflow-hidden"> {/* Added overflow-hidden to contain scrolling */}
            {/* Sidebar component - now takes full height from its flex-grow parent */}
            <Sidebar />
            {/* Main content area - now independently scrollable */}
            <main className="flex-grow p-8 overflow-y-auto h-full"> {/* Added overflow-y-auto and h-full */}
              {children} {/* Render the actual page content here */}
            </main>
          </div>
        </div>
      );
  }

  // Fallback for when the user is not an admin, or is on the login/access-denied page
  // In these cases, we just render the children (e.g., the Login page or Access Denied page)
  // without the full admin layout.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      {children}
    </div>
  );
}