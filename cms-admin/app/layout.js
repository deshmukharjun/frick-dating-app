// cms-admin/app/layout.js
// This is the Root Layout (Server Component). It does NOT have "use client".

import { Inter } from "next/font/google";
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider
import ClientLayoutWrapper from '../components/ClientLayoutWrapper'; // NEW: Client component wrapper
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata must be exported from a Server Component
export const metadata = {
  title: "Frick Dating CMS Admin",
  description: "Admin dashboard for Frick Dating App content management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* AuthProvider wraps the ClientLayoutWrapper */}
          <ClientLayoutWrapper>
            {children} {/* Children (pages) are passed through to ClientLayoutWrapper */}
          </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}