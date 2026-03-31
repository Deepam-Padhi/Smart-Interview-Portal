import React, { useState, useEffect } from 'react';
import { userAPI, resultAPI } from '../services/api';
import '../styles/dashboard.css';

const DEMO_STATS = {
  totalAttempts: 18,
  averageScore: 78.4,
  accuracy: 81.2,
  weakTopic: 'Distributed Systems',
};

const DEMO_RECENT_RESULTS = [
  { id: 1, courseId: 'Java Backend', correctAnswers: 18, totalQuestions: 24, percentage: 75, createdAt: '2026-03-18T10:15:00Z' },
  { id: 2, courseId: 'React Frontend', correctAnswers: 22, totalQuestions: 28, percentage: 78.57, createdAt: '2026-03-19T14:20:00Z' },
  { id: 3, courseId: 'System Design', correctAnswers: 13, totalQuestions: 18, percentage: 72.22, createdAt: '2026-03-20T09:45:00Z' },
  { id: 4, courseId: 'SQL Mastery', correctAnswers: 16, totalQuestions: 20, percentage: 80, createdAt: '2026-03-21T16:05:00Z' },
  { id: 5, courseId: 'DSA Core', correctAnswers: 27, totalQuestions: 32, percentage: 84.37, createdAt: '2026-03-22T11:30:00Z' },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    accuracy: 0,
    weakTopic: '',
  });
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, resultsRes] = await Promise.all([
          userAPI.getDashboardStats(),
          resultAPI.getByUser(),
        ]);

        const apiStats = statsRes?.data;
        const apiResults = Array.isArray(resultsRes?.data) ? resultsRes.data : [];
        const hasUsableStats = apiStats && typeof apiStats.totalAttempts !== 'undefined';

        if (hasUsableStats || apiResults.length > 0) {
          setStats(hasUsableStats ? apiStats : DEMO_STATS);
          setRecentResults(apiResults.length > 0 ? apiResults.slice(0, 5) : DEMO_RECENT_RESULTS);
          setIsDemoData(!hasUsableStats || apiResults.length === 0);
        } else {
          setStats(DEMO_STATS);
          setRecentResults(DEMO_RECENT_RESULTS);
          setIsDemoData(true);
        }
      } catch (err) {
        setStats(DEMO_STATS);
        setRecentResults(DEMO_RECENT_RESULTS);
        setIsDemoData(true);
        setError('Showing demo insights for presentation mode.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p>{error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Performance Dashboard</h1>
      {isDemoData && (
        <p className="demo-banner">Presentation mode: displaying curated demo analytics.</p>
      )}

      <div className="stats-grid">
        <div className="stat-card glass-effect">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Quizzes Attempted</h3>
            <p className="stat-value">{stats.totalAttempts}</p>
          </div>
        </div>

        <div className="stat-card glass-effect">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Average Score</h3>
            <p className="stat-value">{stats.averageScore.toFixed(2)}%</p>
          </div>
        </div>

        <div className="stat-card glass-effect">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Accuracy</h3>
            <p className="stat-value">{stats.accuracy.toFixed(2)}%</p>
          </div>
        </div>

        <div className="stat-card glass-effect">
          <div className="stat-icon">📌</div>
          <div className="stat-content">
            <h3>Weak Topic</h3>
            <p className="stat-value">{stats.weakTopic || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card glass-effect">
          <h2>Score Trend</h2>
          <p className="placeholder">Score chart visualization</p>
        </div>

        <div className="chart-card glass-effect">
          <h2>Topic Performance</h2>
          <p className="placeholder">Topic performance chart</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Quiz Attempts</h2>
        <div className="table-container">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Quiz ID</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date Attempted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.length > 0 ? (
                recentResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.courseId}</td>
                    <td>{result.correctAnswers}/{result.totalQuestions}</td>
                    <td>{result.percentage.toFixed(2)}%</td>
                    <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                    <td className={`status ${result.percentage >= 60 ? 'pass' : 'fail'}`}>
                      {result.percentage >= 60 ? 'Pass ✓' : 'Fail ✗'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No quiz attempts yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;