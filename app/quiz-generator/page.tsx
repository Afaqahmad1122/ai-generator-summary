"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizGeneratorPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    numQuestions: 5,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  const generateQuiz = async () => {
    if (!formData.text.trim() || formData.text.trim().length < 10) {
      setError("Please provide study material (at least 10 characters)");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // Simulate API call to generate quiz
      setTimeout(() => {
        const generatedQuestions: Question[] = [
          {
            id: "1",
            question: "What is machine learning primarily focused on?",
            options: [
              "Following explicit programming instructions",
              "Learning patterns from data through experience",
              "Storing large amounts of information",
              "Creating visual interfaces",
            ],
            correctAnswer: 1,
            explanation:
              "Machine learning focuses on algorithms that learn patterns from data rather than following explicit instructions.",
          },
          {
            id: "2",
            question:
              "Which of the following is NOT a type of machine learning?",
            options: [
              "Supervised Learning",
              "Unsupervised Learning",
              "Reinforcement Learning",
              "Manual Learning",
            ],
            correctAnswer: 3,
            explanation:
              "Manual Learning is not a recognized type of machine learning. The three main types are supervised, unsupervised, and reinforcement learning.",
          },
          {
            id: "3",
            question: "What does overfitting refer to in machine learning?",
            options: [
              "When a model performs well on training data but poorly on new data",
              "When a model learns too slowly",
              "When a model has too few parameters",
              "When a model is too simple",
            ],
            correctAnswer: 0,
            explanation:
              "Overfitting occurs when a model memorizes the training data but fails to generalize to new, unseen data.",
          },
          {
            id: "4",
            question: "What is the purpose of cross-validation?",
            options: [
              "To increase the size of the training dataset",
              "To evaluate model performance",
              "To speed up the training process",
              "To reduce computational costs",
            ],
            correctAnswer: 1,
            explanation:
              "Cross-validation is a technique used to evaluate how well a model will generalize to new data.",
          },
          {
            id: "5",
            question: "In supervised learning, what are features?",
            options: [
              "The output predictions",
              "Input variables used to make predictions",
              "The training algorithm",
              "The evaluation metrics",
            ],
            correctAnswer: 1,
            explanation:
              "Features are the input variables or attributes that the model uses to make predictions.",
          },
        ];

        setQuestions(generatedQuestions);
        setSelectedAnswers(new Array(generatedQuestions.length).fill(-1));
        setIsGenerating(false);
        setIsQuizMode(true);
        setCurrentQuestion(0);
        setShowResults(false);
      }, 2000);
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const resetQuiz = () => {
    setIsQuizMode(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const score = calculateScore();

  if (isQuizMode && !showResults) {
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
                <span className="text-gray-600">Quiz Mode</span>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
                >
                  Exit Quiz
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1} of {questions.length}
              </h1>
              <span className="text-sm text-gray-500">{formData.title}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#F54927] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {questions[currentQuestion]?.question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="px-6 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
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
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
                >
                  Back to Generator
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz Results
            </h1>
            <div className="text-6xl font-bold text-[#F54927] mb-2">
              {score.percentage}%
            </div>
            <p className="text-xl text-gray-600">
              You got {score.correct} out of {score.total} questions correct
            </p>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`p-6 rounded-xl border ${
                  selectedAnswers[index] === question.correctAnswer
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Question {index + 1}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAnswers[index] === question.correctAnswer
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedAnswers[index] === question.correctAnswer
                      ? "Correct"
                      : "Incorrect"}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{question.question}</p>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === question.correctAnswer
                          ? "bg-green-100 border border-green-300"
                          : optionIndex === selectedAnswers[index] &&
                            optionIndex !== question.correctAnswer
                          ? "bg-red-100 border border-red-300"
                          : "bg-gray-50"
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                      {optionIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600 font-medium">
                          ✓ Correct Answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] transition-colors"
            >
              Generate New Quiz
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
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
                href="/summaries"
                className="px-4 py-2 text-gray-600 hover:text-[#F54927] transition-colors"
              >
                Summaries
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
            Quiz Generator
          </h1>
          <p className="text-gray-600">
            Generate practice quizzes from your study materials to test your
            knowledge.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quiz Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a title for your quiz"
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label
                htmlFor="numQuestions"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Questions
              </label>
              <select
                id="numQuestions"
                name="numQuestions"
                value={formData.numQuestions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numQuestions: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>
            </div>

            {/* Study Material */}
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
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Paste your study material here... (minimum 10 characters)"
              />
              <div className="mt-2 text-sm text-gray-500">
                Word count:{" "}
                {
                  formData.text
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word.length > 0).length
                }
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-6">
            <button
              onClick={generateQuiz}
              disabled={isGenerating || !formData.text.trim()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F54927] hover:bg-[#e03d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Quiz...
                </div>
              ) : (
                "Generate Quiz"
              )}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-green-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            💡 Quiz Generation Tips
          </h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>
              • Include complete concepts and explanations for better question
              generation
            </li>
            <li>
              • The more detailed your material, the more comprehensive the quiz
              will be
            </li>
            <li>• Questions will test understanding, not just memorization</li>
            <li>• Each question includes explanations to help you learn</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizGeneratorPage;
