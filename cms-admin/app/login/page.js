// cms-admin/app/login/page.js
"use client";

import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // This local loading state for the form submission
  const router = useRouter();
  const { login, currentUser, isAdmin, loading: authLoading } = useAuth(); // Get authLoading from context

  // A useEffect hook to handle redirects AFTER auth context has settled
  useEffect(() => {
    // Only redirect if authLoading is false (meaning auth state has been determined)
    if (!authLoading) {
      if (currentUser && isAdmin) {
        router.push('/dashboard');
      } else if (currentUser && !isAdmin) {
        router.push('/access-denied');
      }
    }
  }, [currentUser, isAdmin, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Form submission loading
    setLoginError('');

    try {
      await login(email, password);
      // DO NOT call router.push('/dashboard') here immediately.
      // Let the useEffect above handle the redirect once AuthContext updates.
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // End form submission loading
    }
  };

  // While auth context is still loading, or if the user is already logged in (redirect handled by useEffect)
  // we can show a minimal loading state or nothing, to prevent content flicker.
  if (authLoading || (currentUser && (isAdmin || !isAdmin))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        Authenticating...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <Image src="/fricklogodark.svg" alt="FRICK Logo" width={80} height={25} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {loginError && (
            <p className="text-red-500 text-xs italic mb-4 text-center">{loginError}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}