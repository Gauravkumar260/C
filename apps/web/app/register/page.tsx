"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  // Refactored to use a single formData object for consistency with the new handleSubmit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await fetchAPI('/auth/register', {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Auto login or redirect to login
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded-lg border border-slate-800">
        <h1 className="text-2xl font-bold text-center font-rajdhani">Create Account</h1>
        {error && <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 rounded focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 rounded focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 rounded focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 rounded focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 font-bold text-black bg-cyan-500 rounded hover:bg-cyan-400 transition-colors">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-cyan-400 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}
