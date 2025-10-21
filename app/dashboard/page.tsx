"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Summary {
  id: string;
  title: string;
  summaryType: string;
  tags: string[];
  wordCount: number;
  summaryWordCount: number;
  compressionRatio: string;
  createdAt: string;
}

interface Stats {
  totalSummaries: number;
  totalWords: number;
  totalSummaryWords: number;
  avgCompressionRatio: number;
}

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch summaries and stats in parallel
      const [summariesResponse, statsResponse] = await Promise.all([
        fetch("http://localhost:4000/api/summaries?limit=5", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:4000/api/summaries/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const summariesData = await summariesResponse.json();
      const statsData = await statsResponse.json();

      if (summariesData.success) {
        setSummaries(summariesData.data.summaries);
      }

      if (statsData.success) {
        setStats(statsData.data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-[#F54927]"
              >
                AI Study Companion
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey? Let's create some amazing
            summaries.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/create-summary"
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 card-hover"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-[#F54927]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Create Summary
                </h3>
                <p className="text-sm text-gray-600">
                  Generate AI-powered summaries
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/quiz-generator"
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 card-hover"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Generate Quiz
                </h3>
                <p className="text-sm text-gray-600">Create practice quizzes</p>
              </div>
            </div>
          </Link>

          <Link
            href="/chat-tutor"
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 card-hover"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Tutor
                </h3>
                <p className="text-sm text-gray-600">Chat with AI assistant</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Progress
              </h2>

              {stats ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Summaries</span>
                    <span className="font-semibold text-[#F54927]">
                      {stats.totalSummaries}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Words Summarized</span>
                    <span className="font-semibold text-[#F54927]">
                      {stats.totalWords.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Summary Words</span>
                    <span className="font-semibold text-[#F54927]">
                      {stats.totalSummaryWords.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Compression</span>
                    <span className="font-semibold text-[#F54927]">
                      {stats.avgCompressionRatio}%
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No data available yet</p>
              )}
            </div>
          </div>

          {/* Recent Summaries */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Summaries
                </h2>
                <Link
                  href="/summaries"
                  className="text-[#F54927] hover:text-indigo-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>

              {summaries.length > 0 ? (
                <div className="space-y-4">
                  {summaries.map((summary) => (
                    <div
                      key={summary.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {summary.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="capitalize">
                              {summary.summaryType}
                            </span>
                            <span>
                              {summary.wordCount} words →{" "}
                              {summary.summaryWordCount} words
                            </span>
                            <span>{summary.compressionRatio}% compression</span>
                          </div>
                          {summary.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {summary.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-orange-100 text-[#F54927] text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 ml-4">
                          {new Date(summary.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-4">No summaries yet</p>
                  <Link
                    href="/create-summary"
                    className="inline-block px-4 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
                  >
                    Create your first summary
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
