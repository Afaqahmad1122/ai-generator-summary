"use client";

import React, { useState } from "react";
import Link from "next/link";

const DemoPage = () => {
  const [demoText, setDemoText] =
    useState(`Machine learning is a subset of artificial intelligence that focuses on algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. Unlike traditional programming where explicit instructions are given, machine learning systems learn patterns from data.

There are three main types of machine learning:
1. Supervised Learning: Uses labeled training data to learn a mapping from inputs to outputs
2. Unsupervised Learning: Finds hidden patterns in data without labeled examples
3. Reinforcement Learning: Learns through interaction with an environment using rewards and penalties

Key concepts include:
- Training data: The dataset used to teach the model
- Features: Input variables used to make predictions
- Model: The algorithm that makes predictions
- Overfitting: When a model performs well on training data but poorly on new data
- Cross-validation: Technique to evaluate model performance`);

  const [demoSummary, setDemoSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDemoSummary = async () => {
    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      setDemoSummary(`**Machine Learning Overview**

Machine learning is an AI subset that enables computers to improve performance through experience rather than explicit programming.

**Three Main Types:**
• **Supervised Learning**: Uses labeled data to learn input-output mappings
• **Unsupervised Learning**: Discovers hidden patterns without labeled examples  
• **Reinforcement Learning**: Learns through environment interaction using rewards/penalties

**Key Concepts:**
• Training data teaches the model
• Features are input variables for predictions
• Models are prediction algorithms
• Overfitting occurs when models perform well on training data but poorly on new data
• Cross-validation evaluates model performance

**Summary**: Machine learning automates pattern recognition and decision-making by learning from data rather than following predetermined rules.`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#F54927]">
                AI Study Companion
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Try AI Study Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI-powered study tools. Try our
            summarization feature with sample content below.
          </p>
        </div>

        {/* Demo Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Sample Study Material
            </h2>
            <div className="mb-6">
              <textarea
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Paste your study material here..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Word count:{" "}
                {
                  demoText
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word.length > 0).length
                }
              </p>
            </div>

            <button
              onClick={generateDemoSummary}
              disabled={isGenerating || !demoText.trim()}
              className="w-full py-3 px-6 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Summary...
                </div>
              ) : (
                "Generate AI Summary"
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              AI-Generated Summary
            </h2>

            {demoSummary ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                  {demoSummary}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Original:{" "}
                    {
                      demoText
                        .trim()
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }{" "}
                    words
                  </p>
                  <p>
                    Summary:{" "}
                    {
                      demoSummary
                        .trim()
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }{" "}
                    words
                  </p>
                  <p>
                    Compression:{" "}
                    {Math.round(
                      (1 -
                        demoSummary
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length /
                          demoText
                            .trim()
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length) *
                        100
                    )}
                    %
                  </p>
                </div>
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p className="text-gray-500">
                  Click "Generate AI Summary" to see the magic happen!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Showcase */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What You Can Do with AI Study Companion
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#F54927]"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Summaries
              </h3>
              <p className="text-gray-600 text-sm">
                Transform lengthy study materials into concise,
                easy-to-understand summaries with multiple format options.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quiz Generation
              </h3>
              <p className="text-gray-600 text-sm">
                Generate practice quizzes from your study materials to test your
                knowledge and reinforce learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Tutor Chat
              </h3>
              <p className="text-gray-600 text-sm">
                Chat with an AI tutor for personalized study help, explanations,
                and guidance on any topic.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your free account and start studying smarter today!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-[#F54927] text-white rounded-lg text-lg font-semibold hover:bg-[#e03d1f] transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-indigo-600 text-[#F54927] rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
