# AI Study Companion - Frontend

A modern Next.js frontend for the AI Study Companion application that helps students learn faster with AI-powered summaries, quizzes, and tutoring.

## Features

### 🏠 Landing Page (`/`)

- Modern, responsive design with gradient backgrounds
- Feature showcase with interactive cards
- Call-to-action sections
- Professional navigation

### 🔐 Authentication

- **Login Page** (`/login`) - User authentication with form validation
- **Signup Page** (`/signup`) - Account creation with password confirmation
- JWT token management with localStorage
- Demo account option for testing

### 📊 Dashboard (`/dashboard`)

- Personalized welcome message
- Quick action cards for main features
- Progress statistics overview
- Recent summaries display
- Responsive grid layout

### 📝 Summary Management

- **Create Summary** (`/create-summary`) - AI-powered text summarization
- **All Summaries** (`/summaries`) - List and search summaries
- **Summary Detail** (`/summaries/[id]`) - View and edit individual summaries
- Multiple summary types (summary, study_notes, key_points)
- Tag management and search functionality

### 🧠 AI Chat Tutor (`/chat-tutor`)

- Interactive chat interface
- Real-time messaging with typing indicators
- Quick question suggestions
- Chat history management
- Responsive design for mobile

### 📋 Quiz Generator (`/quiz-generator`)

- Generate quizzes from study materials
- Interactive quiz taking experience
- Progress tracking and scoring
- Detailed results with explanations
- Multiple question formats

### 🎯 Demo Page (`/demo`)

- Interactive feature demonstration
- Sample content for testing
- Live summary generation preview
- Feature benefits showcase

## Technical Features

### 🎨 Design System

- **Tailwind CSS** for styling
- Custom CSS variables for theming
- Responsive design (mobile-first)
- Hover effects and transitions
- Modern card-based layouts

### 🔧 Components

- Reusable UI components
- Form validation and error handling
- Loading states and animations
- Toast notifications
- Modal dialogs

### 📱 Responsive Design

- Mobile-optimized layouts
- Tablet and desktop support
- Flexible grid systems
- Touch-friendly interactions

### 🔒 Security

- JWT token authentication
- Protected routes
- Input validation
- XSS protection

## File Structure

```
frontend/app/
├── page.tsx                 # Landing page
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── login/
│   └── page.tsx           # Login page
├── signup/
│   └── page.tsx           # Signup page
├── dashboard/
│   └── page.tsx           # Dashboard
├── create-summary/
│   └── page.tsx           # Create summary
├── summaries/
│   ├── page.tsx           # All summaries
│   └── [id]/
│       └── page.tsx       # Summary detail
├── chat-tutor/
│   └── page.tsx           # AI chat tutor
├── quiz-generator/
│   └── page.tsx           # Quiz generator
└── demo/
    └── page.tsx           # Demo page
```

## Getting Started

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## API Integration

The frontend integrates with the backend API at `http://localhost:4000`:

- **Authentication:** `/api/auth/login`, `/api/auth/signup`
- **Summaries:** `/api/summaries/*`
- **Statistics:** `/api/summaries/stats`

## Key Features Explained

### Summary Creation

- **Line 15-25** in `create-summary/page.tsx`: Form validation and submission
- **Line 45-65**: API integration with error handling
- **Line 70-85**: Real-time word count and character limits

### Dashboard Overview

- **Line 35-50** in `dashboard/page.tsx`: Data fetching with parallel API calls
- **Line 80-120**: Statistics display with conditional rendering
- **Line 125-180**: Recent summaries with hover effects

### Chat Interface

- **Line 25-45** in `chat-tutor/page.tsx`: Message state management
- **Line 50-80**: AI response generation with typing simulation
- **Line 85-95**: Auto-scroll to latest messages

### Quiz System

- **Line 30-60** in `quiz-generator/page.tsx`: Quiz generation logic
- **Line 65-85**: Interactive question navigation
- **Line 90-120**: Score calculation and results display

## Styling Guidelines

- Use Tailwind CSS classes for consistent styling
- Follow the established color scheme (indigo primary, gray secondary)
- Implement hover effects with `hover:` prefix
- Use `card-hover` class for interactive cards
- Maintain responsive breakpoints (sm, md, lg, xl)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Notes

- All pages use `"use client"` directive for client-side functionality
- Form validation includes both client and server-side checks
- Error handling provides user-friendly messages
- Loading states improve user experience
- Responsive design ensures mobile compatibility
