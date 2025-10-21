"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateSummaryPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    summaryType: "summary",
    tags: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      setIsLoading(false);
      return;
    }

    if (!formData.text.trim() || formData.text.trim().length < 10) {
      setError("Text must be at least 10 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Prepare tags array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch("http://localhost:4000/api/summaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          text: formData.text.trim(),
          summaryType: formData.summaryType,
          tags: tagsArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Summary created successfully!");
        setFormData({
          title: "",
          text: "",
          summaryType: "summary",
          tags: "",
        });

        // Redirect to the created summary after 2 seconds
        setTimeout(() => {
          router.push(`/summaries/${data.data.summary.id}`);
        }, 2000);
      } else {
        setError(data.message || "Failed to create summary");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const wordCount = formData.text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create AI Summary
          </h1>
          <p className="text-gray-600">
            Paste your study material and let AI create a concise summary for
            you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Summary Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter a descriptive title for your summary"
                  maxLength={100}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Summary Type */}
              <div>
                <label
                  htmlFor="summaryType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Summary Type
                </label>
                <select
                  id="summaryType"
                  name="summaryType"
                  value={formData.summaryType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="summary">General Summary</option>
                  <option value="study_notes">Study Notes</option>
                  <option value="key_points">Key Points</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Choose the type of summary that best fits your needs
                </p>
              </div>

              {/* Text Input */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Study Material *
                </label>
                <textarea
                  id="text"
                  name="text"
                  rows={12}
                  value={formData.text}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Paste your study material here... (minimum 10 characters)"
                  maxLength={50000}
                />
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Word count: {wordCount}</span>
                  <span>{formData.text.length}/50,000 characters</span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter tags separated by commas (e.g., math, algebra, equations)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add relevant tags to help organize your summaries
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={
                  isLoading || !formData.title.trim() || !formData.text.trim()
                }
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F54927] hover:bg-[#e03d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Summary...
                  </div>
                ) : (
                  "Create Summary"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Tips for Better Summaries
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              • Include complete paragraphs and context for better AI
              understanding
            </li>
            <li>• Use clear, well-structured text for optimal results</li>
            <li>• Add relevant tags to organize your summaries</li>
            <li>• Choose the right summary type based on your study goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateSummaryPage;
