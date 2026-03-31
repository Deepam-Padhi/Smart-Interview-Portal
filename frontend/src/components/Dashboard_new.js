import React, { useState, useEffect } from 'react';
import { userAPI, resultAPI } from '../services/api';
import '../styles/dashboard.css';

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, resultsRes] = await Promise.all([
          userAPI.getDashboardStats(),
          resultAPI.getByUser(),
        ]);
        
        setStats(statsRes.data);
        setRecentResults(resultsRes.data.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data');
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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Performance Dashboard</h1>

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
