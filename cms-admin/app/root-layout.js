// cms-admin/app/root-layout.js
// This file will contain the server-only metadata and the client-component wrapper.
// It is effectively your new "root" layout.
"use client"; // This file is a client component

import { Inter } from "next/font/google";
import { redirect } from 'next/navigation';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// metadata export MUST be in a Server Component
export const metadata = {
  title: "Frick CMS Admin",
  description: "Admin dashboard for Frick content management",
};

// This component needs to be explicitly exported for the new layout.js to import it
export function AppContent({ children }) { // Export AppContent
  "use client"; // <--- Ensure this is at the top of AppContent function

  const { currentUser, isAdmin, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        Loading authentication...
      </div>
    );
  }

  if (!currentUser && window.location.pathname !== '/login') {
     redirect('/login');
     return null;
  }

  if (currentUser && !isAdmin && window.location.pathname !== '/access-denied') {
    redirect('/access-denied');
    return null;
  }

  if (currentUser && isAdmin) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-8">
              {children}
            </main>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      {children}
    </div>
  )
}

// RootLayout is now responsible for setting up the <html> and <body>,
// and for providing the AuthProvider.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children} {/* This will be AppContent and its children */}
        </AuthProvider>
      </body>
    </html>
  );
}