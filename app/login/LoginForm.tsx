"use client";

import Footer from "@/components/ui/Footer";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Branding / Info */}
      <div className="hidden md:flex flex-col justify-center bg-black text-white p-12">
        <h1 className="text-4xl font-bold text-red-500 mb-4">EduPlus</h1>

        <p className="text-lg text-gray-300 mb-6">
          A modern EdTech platform where educators create structured courses and
          students learn through curated lessons with AI-powered summaries.
        </p>

        <ul className="space-y-2 text-gray-400 text-sm">
          <li>• Role-based dashboards for Educators & Students</li>
          <li>• Course & lesson management (Full CRUD)</li>
          <li>• AI-generated course summaries</li>
          <li>• Built with Next.js, Prisma & PostgreSQL</li>
        </ul>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center bg-background">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-card"
        >
          <h2 className="text-2xl font-bold mb-2">Sign in to EduPlus</h2>

          <p className="text-sm text-muted-foreground mb-6">
            Use demo credentials provided below to explore the platform.
          </p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* Demo creds hint */}
          <div className="mt-6 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Demo Accounts:</p>
            <p>Educator → educator@eduplus.com / EduPlus@123</p>
            <p>Student → student@eduplus.com / EduPlus@123</p>
          </div>
        </form>
        <div className="absolute bottom-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
