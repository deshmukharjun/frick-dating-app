"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DatingAppLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber } = formData;

    if (!fullName || !email || !phoneNumber) {
      setError("Please fill in all fields.");
      return;
    }

    router.push("/matches");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to <span className="text-red-500">Frick Chat</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Log In
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-400">
        Please use the main app to sign up.
      </p>
    </div>
  );
}
