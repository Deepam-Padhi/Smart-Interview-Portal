import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CourseSelection from './components/CourseSelection';
import TopicSelection from './components/TopicSelection';
import DifficultySelection from './components/DifficultySelection';
import QuizPlayer from './components/QuizPlayer';
import Result from './components/Result';
import ResultTopics from './components/ResultTopics';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import FreeCourses from './components/FreeCourses';
import AdminDashboard from './components/AdminDashboard';
import AddQuestion from './components/AddQuestion';
import AddCourse from './components/AddCourse';

// Auth Routes Wrapper
const AuthRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const normalizedRole = String(user?.role || 'USER').toUpperCase();
  const isAdmin = normalizedRole.includes('ADMIN');
  const isUser = !isAdmin;

  return (
    <Routes>
      {/* Public Routes */}
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* User Routes */}
          {isUser && (
            <>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/home" element={<Layout><Home /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/quiz" element={<Layout><CourseSelection /></Layout>} />
              <Route path="/topic-selection/:courseId" element={<Layout><TopicSelection /></Layout>} />
              <Route path="/difficulty-selection/:courseId/:topic" element={<Layout><DifficultySelection /></Layout>} />
              <Route path="/quiz-player/:courseId/:topic/:difficulty" element={<Layout><QuizPlayer /></Layout>} />
              <Route path="/results" element={<Layout><ResultTopics /></Layout>} />
              <Route path="/result/:topicId" element={<Layout><Result /></Layout>} />
              <Route path="/resume" element={<Layout><ResumeAnalyzer /></Layout>} />
              <Route path="/courses" element={<Layout><FreeCourses /></Layout>} />
            </>
          )}

          {/* Admin Routes */}
          {isAdmin && (
            <>
              <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
              <Route path="/add-question" element={<Layout><AddQuestion /></Layout>} />
              <Route path="/add-course" element={<Layout><AddCourse /></Layout>} />
              <Route path="/admin-results" element={<Layout><AdminDashboard /></Layout>} />
            </>
          )}

          {/* Common Routes */}
          <Route path="/" element={<Navigate to={isAdmin ? '/admin' : '/home'} replace />} />
          <Route path="/login" element={<Navigate to={isAdmin ? '/admin' : '/home'} replace />} />
          <Route path="/register" element={<Navigate to={isAdmin ? '/admin' : '/home'} replace />} />
          <Route path="*" element={<Navigate to={isAdmin ? '/admin' : '/home'} replace />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AuthRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;