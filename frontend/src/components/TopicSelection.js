import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionAPI } from '../services/api';

const DEMO_TOPICS_BY_COURSE = {
  '101': ['Java Foundation', 'OOP Basics', 'Exception Handling'],
  '102': ['Cloud and DevOps', 'CI/CD', 'Containers'],
  '103': ['Data Science', 'Model Evaluation', 'Feature Engineering'],
  '104': ['Cybersecurity', 'Threat Detection', 'Incident Response'],
  '105': ['Salesforce Admin', 'Reports and Dashboards', 'User Management'],
  '106': ['Apex Development', 'Triggers', 'SOQL and Governor Limits'],
};

const TopicSelection = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        // Fetch topics using the courseId
        const response = await questionAPI.getByCourse(courseId);
        const topicList = Array.isArray(response.data) ? response.data : [];
        console.log('Fetched topics from API:', topicList);
        setTopics(topicList.length > 0 ? topicList : (DEMO_TOPICS_BY_COURSE[courseId] || []));
      } catch (err) {
        setError('Showing demo topics for this course.');
        setTopics(DEMO_TOPICS_BY_COURSE[courseId] || []);
        console.error('Failed to fetch topics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [courseId]);

  const handleSelectTopic = (topic) => {
    navigate(`/difficulty-selection/${courseId}/${encodeURIComponent(topic)}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading topics...</p>
      </div>
    );
  }

  return (
    <div className="topics-container">
      <div className="topics-header">
        <h1>Select a Topic</h1>
        <p>Choose a topic to begin the quiz</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="topics-grid">
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <div key={index} className="topic-card">
              <div className="topic-icon">📚</div>
              <h3 className="topic-name">{topic}</h3>
              <button
                className="select-btn"
                onClick={() => handleSelectTopic(topic)}
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-text)' }}>
              No topics available for this course yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelection;