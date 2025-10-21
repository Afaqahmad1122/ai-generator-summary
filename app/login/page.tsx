"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Google OAuth configuration
  const GOOGLE_CLIENT_ID =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your-google-client-id";

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Make handleGoogleLogin available globally
    (window as any).handleGoogleLogin = handleGoogleLogin;

    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (window as any).handleGoogleLogin,
        });
      }
    };

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
      // Cleanup global function
      delete (window as any).handleGoogleLogin;
    };
  }, []);

  const handleGoogleLogin = async (response: any) => {
    console.log("Google login response:", response);
    setIsLoading(true);
    setError("");

    try {
      // Send the credential to backend
      const backendResponse = await fetch(
        "http://localhost:4000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: response.credential,
          }),
        }
      );

      const data = await backendResponse.json();
      console.log("Backend response:", data);

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        console.log("Login successful, redirecting to dashboard");
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        setError(data.message || "Google login failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // API call to backend login endpoint
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-li-to-br from-orange-50 to-red-50 flex items-center justify-center py-4 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-[#F54927]"
          >
            AI Study Companion
          </Link>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-[#F54927] hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 sm:mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 space-y-3 sm:space-y-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F54927] focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#F54927] hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F54927] hover:bg-[#e03d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="mt-6">
              <div
                id="g_id_onload"
                data-client_id={GOOGLE_CLIENT_ID}
                data-callback="handleGoogleLogin"
                data-auto_prompt="false"
              ></div>
              <div
                className="g_id_signin w-full"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
                data-width="100%"
              ></div>
            </div>
          </div>
        </form>

        {/* Demo Account */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Want to try it out?{" "}
            <button
              onClick={() => {
                setFormData({
                  email: "demo@example.com",
                  password: "demo123",
                });
              }}
              className="font-medium text-[#F54927] hover:text-indigo-500"
            >
              Use demo account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
