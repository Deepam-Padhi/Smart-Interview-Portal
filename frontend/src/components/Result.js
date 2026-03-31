import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { resultAPI } from '../services/api';

const DEMO_RESULT = {
  id: 999,
  score: 17,
  total: 20,
  percentage: 85,
  status: 'pass',
  topic: 'Presentation Demo Quiz',
};

const Result = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        // If using location state from quiz submission
        if (location.state) {
          const { score, total } = location.state;
          setResult({
            score,
            total,
            percentage: Math.round((score / total) * 100),
            status: Math.round((score / total) * 100) >= 60 ? 'pass' : 'fail'
          });
        } else {
          // Otherwise fetch from API
          const response = await resultAPI.getById(topicId);
          const data = response.data;
          setResult({
            ...data,
            percentage: Math.round((data.score / data.total) * 100),
            status: Math.round((data.score / data.total) * 100) >= 60 ? 'pass' : 'fail'
          });
        }
      } catch (err) {
        setResult(DEMO_RESULT);
        setError('Showing demo result for presentation mode.');
        console.error('Failed to fetch result:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [topicId, location.state]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="error-container">
        <h2>{error || 'No results found'}</h2>
        <button
          className="select-btn"
          onClick={() => navigate('/results')}
        >
          Back to Results
        </button>
      </div>
    );
  }

  const percentage = result.percentage;
  const isPass = result.status === 'pass';
  
  let performanceLevel = 'Needs Improvement';
  let performanceColor = '#ef4444';
  if (percentage >= 90) {
    performanceLevel = 'Outstanding';
    performanceColor = '#10b981';
  } else if (percentage >= 75) {
    performanceLevel = 'Excellent';
    performanceColor = '#10b981';
  } else if (percentage >= 60) {
    performanceLevel = 'Good';
    performanceColor = '#f59e0b';
  } else if (percentage >= 40) {
    performanceLevel = 'Fair';
    performanceColor = '#f97316';
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>Quiz Results</h1>
        <div className={`result-status ${isPass ? 'pass' : 'fail'}`} style={{ backgroundColor: performanceColor }}>
          {isPass ? '✓ PASSED' : '✗ FAILED'} • {performanceLevel}
        </div>
      </div>
      {error && <p className="demo-banner">{error}</p>}

      <div className="result-card">
        <div className="score-section">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Your Score</p>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: performanceColor, marginBottom: '0.5rem' }}>
              {percentage}%
            </div>
            <p style={{ fontSize: '1rem', color: '#888' }}>
              {result.score} out of {result.total} correct
            </p>
          </div>
          
          <div className="score-meter" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <div
              className="score-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: performanceColor,
                height: '12px',
                borderRadius: '6px',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>

        <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
          <div className="stat" style={{ textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Correct Answers</label>
            <span className="correct" style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{result.score}</span>
          </div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Wrong Answers</label>
            <span className="wrong" style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{result.total - result.score}</span>
          </div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Completion</label>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>100%</span>
          </div>
        </div>
      </div>

      <div className="suggestions-section" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '0.75rem', marginTop: '2rem', borderLeft: `4px solid ${performanceColor}` }}>
        <h3 style={{ marginTop: 0, color: performanceColor }}>💡 Personalized Feedback</h3>
        {percentage < 40 && (
          <>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Topic fundamentals need attention – review study materials before retrying</div>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Start with Easy difficulty level to build confidence</div>
            <div className="suggestion-item">✦ Re-read concept explanations with each question</div>
          </>
        )}
        {percentage >= 40 && percentage < 60 && (
          <>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ You're on the right track! Continue practicing with Medium difficulty</div>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Focus on topics where you had the most wrong answers</div>
            <div className="suggestion-item">✦ Aim for 70%+ before moving to harder questions</div>
          </>
        )}
        {percentage >= 60 && percentage < 80 && (
          <>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Good progress! You're understanding the core concepts well</div>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Challenge yourself with Hard difficulty questions</div>
            <div className="suggestion-item">✦ Review the few questions you missed for mastery</div>
          </>
        )}
        {percentage >= 80 && (
          <>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Excellent work! You've demonstrated strong mastery of this topic</div>
            <div className="suggestion-item" style={{ marginBottom: '0.75rem' }}>✦ Move to the next topic to expand your skillset</div>
            <div className="suggestion-item">✦ Try mock interviews to apply your knowledge in realistic scenarios</div>
          </>
        )}
      </div>

      <div className="result-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          className="nav-btn"
          onClick={() => navigate('/quiz')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          📝 Take Another Quiz
        </button>
        <button
          className="nav-btn secondary"
          onClick={() => navigate('/results')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'transparent',
            color: '#2563eb',
            border: '2px solid #2563eb',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          📊 All Results
        </button>
        <button
          className="nav-btn secondary"
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'transparent',
            color: '#2563eb',
            border: '2px solid #2563eb',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          📈 Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;