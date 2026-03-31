import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DifficultySelection = () => {
  const { courseId, topic } = useParams();
  const navigate = useNavigate();

  const difficultyLevels = [
    {
      name: 'Easy',
      icon: '⭐',
      description: 'Beginner level questions',
      color: '#10b981'
    },
    {
      name: 'Medium',
      icon: '⭐⭐',
      description: 'Intermediate level questions',
      color: '#f59e0b'
    },
    {
      name: 'Hard',
      icon: '⭐⭐⭐',
      description: 'Advanced level questions',
      color: '#ef4444'
    }
  ];

  const handleSelectDifficulty = (difficulty) => {
    navigate(`/quiz-player/${courseId}/${encodeURIComponent(topic)}/${difficulty.toLowerCase()}`);
  };

  return (
    <div className="difficulty-container">
      <div className="difficulty-header">
        <h1>Select Difficulty Level</h1>
        <p>Topic: {decodeURIComponent(topic)}</p>
      </div>

      <div className="difficulty-grid">
        {difficultyLevels.map((level, index) => (
          <div
            key={index}
            className="difficulty-card"
            style={{ borderColor: level.color }}
          >
            <div className="difficulty-icon" style={{ color: level.color }}>
              {level.icon}
            </div>
            <h3 className="difficulty-name">{level.name}</h3>
            <p className="difficulty-description">{level.description}</p>
            <button
              className="select-btn"
              style={{ borderColor: level.color, color: level.color }}
              onClick={() => handleSelectDifficulty(level.name)}
            >
              Start {level.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelection;