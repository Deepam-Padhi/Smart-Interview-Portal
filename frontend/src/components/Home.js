import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [seedingData, setSeedingData] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  const seedDemoData = async () => {
    try {
      setSeedingData(true);
      setSeedStatus('Seeding demo data...');
      const response = await fetch('http://localhost:8080/api/admin/seed-demo-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setSeedStatus('✅ Demo courses and questions loaded successfully!');
        // Wait 1.5 seconds then navigate to quiz to show fresh data
        setTimeout(() => {
          navigate('/quiz');
        }, 1500);
      } else {
        setSeedStatus('❌ Error seeding data. Please try again.');
        setSeedingData(false);
      }
    } catch (error) {
      setSeedStatus('❌ Connection error. Ensure backend is running on port 8080.');
      setSeedingData(false);
      console.error('Error seeding data:', error);
    }
  };

  const quickActions = [
    {
      id: 1,
      title: 'Start Quiz',
      icon: '🧠',
      description: 'Test your knowledge with interactive quizzes',
      action: () => navigate('/quiz'),
    },
    {
      id: 2,
      title: 'Dashboard',
      icon: '📈',
      description: 'View your progress and performance metrics',
      action: () => navigate('/dashboard'),
    },
    {
      id: 3,
      title: 'Resume Analysis',
      icon: '✨',
      description: 'Upload and analyze your resume',
      action: () => navigate('/resume'),
    },
    {
      id: 4,
      title: 'Free Courses',
      icon: '🎯',
      description: 'Access placement preparation courses',
      action: () => navigate('/courses'),
    },
    {
      id: 5,
      title: 'Results',
      icon: '🏅',
      description: 'View your quiz results and analytics',
      action: () => navigate('/results'),
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section" id="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-kicker">Career Acceleration Platform</p>
            <h1 className="hero-title">
              Welcome, {user?.fullName || 'User'}
              <span> Cracking Interviews Starts Here</span>
            </h1>
            <p className="hero-subtitle">
              Build confidence with AI-powered quizzes, real hiring patterns, resume insights,
              and role-focused preparation paths crafted for top product companies.
            </p>

            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate('/quiz')}>
                Start Practicing
              </button>
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                Open Dashboard
              </button>
              <button 
                className="btn-secondary" 
                onClick={seedDemoData}
                disabled={seedingData}
                title="Load sample courses and quiz questions for presentation"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1rem' }}
              >
                {seedingData ? '⏳ Loading...' : '📚 Setup Demo Data'}
              </button>
            </div>
            {seedStatus && (
              <p className="seed-status" style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: seedStatus.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: seedStatus.includes('✅') ? '#10b981' : '#ef4444',
                fontSize: '0.9rem',
                border: `1px solid ${seedStatus.includes('✅') ? '#10b981' : '#ef4444'}`
              }}>
                {seedStatus}
              </p>
            )}

            <div className="hero-stats">
              <div className="stat-pill"><strong>12k+</strong><span>Questions</span></div>
              <div className="stat-pill"><strong>320+</strong><span>Tracks</span></div>
              <div className="stat-pill"><strong>89%</strong><span>Success Lift</span></div>
            </div>
          </div>

          <div className="hero-panel glass-effect">
            <h3>Preparation Flight Plan</h3>
            <ul>
              <li><span>1</span>Baseline Assessment</li>
              <li><span>2</span>Topic Mastery Sprints</li>
              <li><span>3</span>Mock Interview Simulation</li>
              <li><span>4</span>Resume & Profile Optimization</li>
            </ul>
            <button className="panel-btn" onClick={() => navigate('/resume')}>
              Optimize My Resume
            </button>
          </div>
        </div>
      </section>

      <section className="brands-strip">
        <div>Trusted by aspiring candidates for</div>
        <p>Amazon • Microsoft • Google • Salesforce • Atlassian • Adobe</p>
      </section>

      <section className="cards-section" id="actions">
        <div className="section-heading">
          <h2>Everything You Need In One Workflow</h2>
          <p>Jump to the next step in your preparation journey.</p>
        </div>
        <div className="cards-grid">
          {quickActions.map(card => (
            <div key={card.id} className="card glass-effect">
              <div className="card-icon">{card.icon}</div>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              <button className="card-button" onClick={card.action}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <h2>Designed Like A Real Career Product</h2>
          <p>Clean, fast and focused UX built for outcomes.</p>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h3>Smart Learning Paths</h3>
            <p>Adaptive sequence based on your weak spots and target role.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧭</span>
            <h3>Role-Aligned Practice</h3>
            <p>Questions and challenges mapped to actual interview demand.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <h3>Actionable Analytics</h3>
            <p>See patterns, accuracy trend, speed and confidence indicators.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <h3>Expert-Curated Content</h3>
            <p>High-quality prompts and models reviewed by professionals.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner" id="final-cta">
        <h2>Ready For Your Next Interview Win?</h2>
        <p>Start your focused prep session now and build momentum every day.</p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>
          Launch Practice Session
        </button>
      </section>
    </div>
  );
};

export default Home;