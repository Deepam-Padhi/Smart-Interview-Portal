import React, { useState } from 'react';
import { resumeAPI } from '../services/api';
import '../styles/resume.css';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
      setError('');
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setError('');
    }
  };

  const handleAnalyzeResume = async () => {
    if (!file) {
      setError('Please select a file to analyze');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await resumeAPI.analyze(formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Failed to analyze resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 55) return '#ef5350';
    return '#e53e3e';
  };

  return (
    <div className="resume-analyzer">
      <div className="analyzer-header">
        <h1>📄 Resume Analyzer</h1>
        <p>Upload your resume to get instant AI-powered feedback and improvement suggestions</p>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {!result ? (
        <div className="resume-section">
          <div
            className={`upload-section ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">�</div>
              <h3>Drop your resume here</h3>
              <p className="divider">or</p>
              <label className="file-input-label">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="file-input"
                />
                📁 Browse Files
              </label>
              <p className="file-info">
                Supported: PDF, DOC, DOCX, TXT (Max 5MB)
              </p>
            </div>
          </div>

          {file && (
            <div className="selected-file">
              <div className="file-info-card">
                <span className="file-icon">✓</span>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                className="analyze-btn"
                onClick={handleAnalyzeResume}
                disabled={loading}
              >
                {loading ? '⏳ Analyzing Resume...' : '🚀 Analyze Resume'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="analysis-result">
          <div className="result-header">
            <h2>✨ Analysis Results</h2>
            <button className="reset-btn" onClick={handleReset}>
              ← Analyze Another
            </button>
          </div>

          {/* Score Section */}
          <div className="score-section">
            <div className="score-card">
              <div className="score-circle" style={{ borderColor: getScoreColor(result.overallScore || 75) }}>
                <div className="score-number" style={{ color: getScoreColor(result.overallScore || 75) }}>
                  {result.overallScore || 75}
                </div>
                <div className="score-label">Overall Score</div>
              </div>

              <div className="score-bar">
                <div
                  className="score-progress"
                  style={{ 
                    width: `${result.overallScore || 75}%`,
                    backgroundColor: getScoreColor(result.overallScore || 75)
                  }}
                ></div>
              </div>

              <p className="score-interpretation">
                {result.summary || 'Your resume has been analyzed successfully.'}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          {result.skills && result.skills.length > 0 && (
            <div className="detail-card skills-card">
              <h3>🎯 Key Skills Identified</h3>
              <div className="skills-container">
                {result.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sections Checklist */}
          {result.sections && (
            <div className="detail-card sections-card">
              <h3>📋 Resume Sections</h3>
              <div className="sections-list">
                {Object.entries(result.sections).map(([section, isPresent]) => (
                  <div key={section} className={`section-item ${isPresent ? 'present' : 'missing'}`}>
                    <span className="section-status">
                      {isPresent ? '✓' : '○'}
                    </span>
                    <span className="section-name">
                      {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          <div className="suggestions-section">
            <h3>💡 Improvement Suggestions</h3>
            <div className="suggestions-list">
              {result.suggestions ? (
                <>
                  {Array.isArray(result.suggestions) ? (
                    result.suggestions.map((suggestion, index) => (
                      <div key={index} className="suggestion-item">
                        <span className="suggestion-icon">
                          {suggestion.includes('✓') ? '✓' : '→'}
                        </span>
                        <span className="suggestion-text">{suggestion}</span>
                      </div>
                    ))
                  ) : (
                    <div className="suggestion-item">
                      <span className="suggestion-icon">→</span>
                      <span>{result.suggestions}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="suggestion-item">
                    <span className="suggestion-icon">→</span>
                    <span>Add more quantifiable achievements and metrics</span>
                  </div>
                  <div className="suggestion-item">
                    <span className="suggestion-icon">→</span>
                    <span>Include relevant certifications and qualifications</span>
                  </div>
                  <div className="suggestion-item">
                    <span className="suggestion-icon">→</span>
                    <span>Add links to GitHub or portfolio projects</span>
                  </div>
                  <div className="suggestion-item">
                    <span className="suggestion-icon">→</span>
                    <span>Use strong action verbs (Designed, Implemented, Led, Managed)</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="analysis-footer">
            <p>📊 Analysis powered by intelligent resume parsing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;