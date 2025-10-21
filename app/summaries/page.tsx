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

const SummariesPage = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchSummaries();
  }, [router, currentPage]);

  const fetchSummaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/summaries?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSummaries(data.data.summaries);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        setError(data.message || "Failed to fetch summaries");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchSummaries();
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/summaries/search?q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSummaries(data.data.summaries);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        setError(data.message || "Search failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (summaryId: string) => {
    if (!confirm("Are you sure you want to delete this summary?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/summaries/${summaryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove the deleted summary from the list
        setSummaries(summaries.filter((summary) => summary.id !== summaryId));
      } else {
        alert(data.message || "Failed to delete summary");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSummaryTypeColor = (type: string) => {
    switch (type) {
      case "summary":
        return "bg-blue-100 text-blue-800";
      case "study_notes":
        return "bg-green-100 text-green-800";
      case "key_points":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading && summaries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading summaries...</p>
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
              <Link
                href="/dashboard"
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/create-summary"
                className="px-4 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
              >
                Create Summary
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  router.push("/");
                }}
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Summaries
          </h1>
          <p className="text-gray-600">
            View and manage all your AI-generated summaries.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search summaries by title, content, or tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
            >
              Search
            </button>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  fetchSummaries();
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Summaries List */}
        {summaries.length > 0 ? (
          <div className="space-y-4">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 card-hover"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {summary.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getSummaryTypeColor(
                          summary.summaryType
                        )}`}
                      >
                        {summary.summaryType.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <span>
                        {summary.wordCount} words → {summary.summaryWordCount}{" "}
                        words
                      </span>
                      <span>{summary.compressionRatio}% compression</span>
                      <span>Created {formatDate(summary.createdAt)}</span>
                    </div>

                    {summary.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
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

                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/summaries/${summary.id}`}
                      className="px-3 py-1 bg-[#F54927] text-white text-sm rounded-lg hover:bg-[#e03d1f] transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(summary.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No summaries found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Create your first summary to get started"}
            </p>
            <Link
              href="/create-summary"
              className="inline-block px-6 py-3 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
            >
              Create Summary
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesPage;
