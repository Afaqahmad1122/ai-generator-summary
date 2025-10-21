"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Summary {
  id: string;
  userId: string;
  title: string;
  originalText: string;
  summary: string;
  summaryType: string;
  tags: string[];
  isPublic: boolean;
  wordCount: number;
  summaryWordCount: number;
  compressionRatio: string;
  createdAt: string;
  updatedAt: string;
}

const SummaryDetailPage = ({ params }: { params: { id: string } }) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    tags: "",
    isPublic: false,
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchSummary();
  }, [params.id, router]);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/summaries/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSummary(data.data.summary);
        setEditData({
          title: data.data.summary.title,
          tags: data.data.summary.tags.join(", "),
          isPublic: data.data.summary.isPublic,
        });
      } else {
        setError(data.message || "Failed to fetch summary");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const tagsArray = editData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch(
        `http://localhost:4000/api/summaries/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editData.title,
            tags: tagsArray,
            isPublic: editData.isPublic,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSummary(data.data.summary);
        setIsEditing(false);
      } else {
        alert(data.message || "Failed to update summary");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this summary?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/summaries/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        router.push("/summaries");
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading summary...</p>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Summary Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The summary you're looking for doesn't exist."}
          </p>
          <Link
            href="/summaries"
            className="px-6 py-3 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
          >
            Back to Summaries
          </Link>
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
                href="/summaries"
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                All Summaries
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500 w-full"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {summary.title}
                </h1>
              )}

              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getSummaryTypeColor(
                    summary.summaryType
                  )}`}
                >
                  {summary.summaryType.replace("_", " ")}
                </span>
                <span className="text-sm text-gray-500">
                  Created {formatDate(summary.createdAt)}
                </span>
                {summary.updatedAt !== summary.createdAt && (
                  <span className="text-sm text-gray-500">
                    Updated {formatDate(summary.updatedAt)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <span>
                  {summary.wordCount} words → {summary.summaryWordCount} words
                </span>
                <span>{summary.compressionRatio}% compression</span>
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editData.isPublic}
                    onChange={(e) =>
                      setEditData({ ...editData, isPublic: e.target.checked })
                    }
                    disabled={!isEditing}
                    className="mr-1"
                  />
                  Public
                </span>
              </div>

              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={editData.tags}
                    onChange={(e) =>
                      setEditData({ ...editData, tags: e.target.value })
                    }
                    placeholder="Enter tags separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ) : (
                summary.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {summary.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-[#F54927] text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )
              )}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        title: summary.title,
                        tags: summary.tags.join(", "),
                        isPublic: summary.isPublic,
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Summary Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-[#F54927] mr-2"
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
              AI Summary
            </h2>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {summary.summary}
              </div>
            </div>
          </div>

          {/* Original Text */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-gray-600 mr-2"
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
              Original Text
            </h2>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed max-h-96 overflow-y-auto">
                {summary.originalText}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/create-summary"
            className="px-6 py-3 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
          >
            Create New Summary
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(summary.summary);
              alert("Summary copied to clipboard!");
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Copy Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetailPage;
