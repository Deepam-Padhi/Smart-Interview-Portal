import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionAPI } from '../services/api';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    courseId: '',
    topic: '',
    difficulty: 'Easy',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.courseId.trim()) {
      setError('Course ID is required');
      return false;
    }
    if (!formData.topic.trim()) {
      setError('Topic is required');
      return false;
    }
    if (!formData.question.trim()) {
      setError('Question is required');
      return false;
    }
    if (!formData.optionA.trim() || !formData.optionB.trim() || 
        !formData.optionC.trim() || !formData.optionD.trim()) {
      setError('All options are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await questionAPI.create(formData);
      
      setSuccess(true);
      setFormData({
        courseId: '',
        topic: '',
        difficulty: 'Easy',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A'
      });

      setTimeout(() => {
        setSuccess(false);
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Failed to add question:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-question-container">
      <div className="form-header">
        <h1>Add Quiz Question</h1>
        <p>Create a new question for the quiz system</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          ✓ Question added successfully! Redirecting...
        </div>
      )}

      <form className="question-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Question Details</h3>
          
          <div className="form-group">
            <label htmlFor="courseId">Course ID *</label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              placeholder="Enter course ID"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="topic">Topic *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter topic name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level *</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="question">Question *</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter the question text"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h3>Options</h3>
          
          <div className="form-group">
            <label htmlFor="optionA">Option A *</label>
            <input
              type="text"
              id="optionA"
              name="optionA"
              value={formData.optionA}
              onChange={handleChange}
              placeholder="Enter option A"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="optionB">Option B *</label>
            <input
              type="text"
              id="optionB"
              name="optionB"
              value={formData.optionB}
              onChange={handleChange}
              placeholder="Enter option B"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="optionC">Option C *</label>
            <input
              type="text"
              id="optionC"
              name="optionC"
              value={formData.optionC}
              onChange={handleChange}
              placeholder="Enter option C"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="optionD">Option D *</label>
            <input
              type="text"
              id="optionD"
              name="optionD"
              value={formData.optionD}
              onChange={handleChange}
              placeholder="Enter option D"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="correctAnswer">Correct Answer *</label>
            <select
              id="correctAnswer"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Question'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/admin')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;