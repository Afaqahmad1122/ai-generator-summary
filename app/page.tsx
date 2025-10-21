import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#F54927]">
                AI Study Companion
              </h1>
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Faster with AI-Powered Study Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your study materials into concise summaries, generate
            quizzes, and chat with an AI tutor to accelerate your learning
            journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-[#F54927] text-white rounded-lg text-lg font-semibold hover:bg-[#e03d1f] transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="px-8 py-3 border border-[#F54927] text-[#F54927] rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Study Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to study smarter, not harder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Summarizer */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Summarizer
              </h3>
              <p className="text-gray-600 mb-6">
                Upload text or paste study material and get concise,
                easy-to-understand summaries powered by advanced AI technology.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Multiple summary types</li>
                <li>• Key points extraction</li>
                <li>• Study notes generation</li>
              </ul>
            </div>

            {/* Quiz Generator */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quiz Generator
              </h3>
              <p className="text-gray-600 mb-6">
                Generate multiple-choice questions from your study materials to
                test your knowledge and reinforce learning.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Multiple choice questions</li>
                <li>• Instant feedback</li>
                <li>• Progress tracking</li>
              </ul>
            </div>

            {/* AI Chat Tutor */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Chat Tutor
              </h3>
              <p className="text-gray-600 mb-6">
                Chat with an AI tutor for personalized study help, explanations,
                and guidance on any topic.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• 24/7 availability</li>
                <li>• Personalized responses</li>
                <li>• Chat history saved</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#F54927] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of students who are already studying smarter with AI
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-[#F54927] rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AI Study Companion</h3>
            <p className="text-gray-400 mb-6">
              Empowering students with AI-powered learning tools
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
