"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatTutorPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI study tutor. I'm here to help you understand any topic, answer questions, and guide your learning. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    scrollToBottom();
  }, [messages, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(inputText.trim()),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm excited to help you learn! What subject or topic would you like to explore today?";
    }

    if (input.includes("math") || input.includes("mathematics")) {
      return "Mathematics is a fascinating subject! I can help you with algebra, calculus, geometry, statistics, or any other math topic. What specific area would you like to work on?";
    }

    if (
      input.includes("science") ||
      input.includes("physics") ||
      input.includes("chemistry") ||
      input.includes("biology")
    ) {
      return "Science is all about understanding the world around us! I can explain concepts in physics, chemistry, biology, or any other scientific field. What would you like to learn about?";
    }

    if (input.includes("history")) {
      return "History helps us understand how we got to where we are today. I can discuss any historical period, events, or figures. What historical topic interests you?";
    }

    if (
      input.includes("explain") ||
      input.includes("what is") ||
      input.includes("how does")
    ) {
      return "I'd be happy to explain that! Could you provide more specific details about what you'd like me to clarify? The more context you give me, the better I can help you understand.";
    }

    if (input.includes("help") || input.includes("confused")) {
      return "Don't worry, I'm here to help! Learning can be challenging, but breaking things down into smaller parts often helps. What specific concept are you struggling with?";
    }

    if (input.includes("study") || input.includes("studying")) {
      return "Great question! Effective studying involves active learning techniques. Try methods like summarizing in your own words, creating flashcards, teaching someone else, or practicing with problems. What study method would you like to explore?";
    }

    // Default response
    return `That's an interesting question! I'd love to help you understand "${userInput}". Could you provide a bit more context or let me know what specific aspect you'd like me to focus on? I'm here to make learning easier and more engaging for you!`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI study tutor. I'm here to help you understand any topic, answer questions, and guide your learning. What would you like to learn about today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI Study Tutor
              </h1>
              <p className="text-gray-600">
                Chat with your AI tutor for personalized study help and
                explanations.
              </p>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.isUser
                      ? "bg-[#F54927] text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.isUser ? "text-indigo-100" : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-6 py-2 bg-[#F54927] text-white rounded-lg hover:bg-[#e03d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Questions to Get Started:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() =>
                setInputText("Can you explain photosynthesis in simple terms?")
              }
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Science Help</div>
              <div className="text-sm text-gray-600">
                "Can you explain photosynthesis in simple terms?"
              </div>
            </button>

            <button
              onClick={() =>
                setInputText("How do I solve quadratic equations?")
              }
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Math Help</div>
              <div className="text-sm text-gray-600">
                "How do I solve quadratic equations?"
              </div>
            </button>

            <button
              onClick={() =>
                setInputText("What are effective study techniques?")
              }
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Study Tips</div>
              <div className="text-sm text-gray-600">
                "What are effective study techniques?"
              </div>
            </button>

            <button
              onClick={() =>
                setInputText("Can you help me understand World War II?")
              }
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">History Help</div>
              <div className="text-sm text-gray-600">
                "Can you help me understand World War II?"
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTutorPage;
