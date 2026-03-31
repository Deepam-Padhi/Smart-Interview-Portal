import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DEMO_RESULTS = [
  { id: 501, topic: 'Java OOP', score: 8, total: 10, difficulty: 'Medium', courseId: 'Java Backend', createdAt: '2026-03-12T09:00:00Z' },
  { id: 502, topic: 'React Hooks', score: 9, total: 12, difficulty: 'Medium', courseId: 'Frontend Engineering', createdAt: '2026-03-14T10:00:00Z' },
  { id: 503, topic: 'SQL Joins', score: 7, total: 10, difficulty: 'Easy', courseId: 'Database Track', createdAt: '2026-03-16T11:00:00Z' },
  { id: 504, topic: 'Caching Strategies', score: 6, total: 10, difficulty: 'Hard', courseId: 'System Design', createdAt: '2026-03-19T12:00:00Z' },
  { id: 505, topic: 'Binary Search', score: 10, total: 10, difficulty: 'Easy', courseId: 'DSA Core', createdAt: '2026-03-21T13:00:00Z' },
];

const ResultTopics = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await resultAPI.getByUser(user?.id || user?.userId);
        const apiResults = Array.isArray(response.data) ? response.data : [];
        setResults(apiResults.length > 0 ? apiResults : DEMO_RESULTS);
      } catch (err) {
        setError('Showing demo results for presentation mode.');
        setResults(DEMO_RESULTS);
        console.error('Failed to fetch results:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id || user?.userId) {
      fetchResults();
    } else {
      setResults(DEMO_RESULTS);
      setError('Showing demo results for presentation mode.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Your Quiz Results</h1>
        <p>Track your performance across all attempts</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results.length === 0 ? (
        <div className="empty-state">
          <h2>No results yet</h2>
          <p>Complete some quizzes to see your results here</p>
          <button
            className="select-btn"
            onClick={() => navigate('/quiz')}
          >
            Start a Quiz
          </button>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((result, index) => {
            const percentage = Math.round((result.score / result.total) * 100);
            const isPass = percentage >= 60;

            return (
              <div
                key={index}
                className="result-item-card"
                onClick={() => navigate(`/result/${result.id || index}`)}
              >
                <div className="result-header-mini">
                  <h3>{result.topic}</h3>
                  <span className={`status-badge ${isPass ? 'pass' : 'fail'}`}>
                    {isPass ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>

                <div className="result-score">
                  <div className="score-mini">{result.score}/{result.total}</div>
                  <div className="percentage">{percentage}%</div>
                </div>

                <div className="result-info">
                  <p><strong>Difficulty:</strong> {result.difficulty}</p>
                  <p><strong>Course:</strong> {result.courseId || 'N/A'}</p>
                </div>

                <div className="result-meta">
                  <small>{new Date(result.createdAt || Date.now()).toLocaleDateString()}</small>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="results-actions">
        <button
          className="select-btn"
          onClick={() => navigate('/quiz')}
        >
          Take Another Quiz
        </button>
        <button
          className="select-btn secondary"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultTopics;