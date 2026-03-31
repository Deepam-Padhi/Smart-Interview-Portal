import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { setCourseMapping } from '../services/api';
import '../styles/quiz.css';

const DEMO_COURSES = [
  {
    id: 101,
    title: 'Infosys Springboard - Java Foundation Certification',
    description: 'Core Java, OOP, exception handling, and collections aligned to placement prep.',
    questionCount: 24,
  },
  {
    id: 102,
    title: 'Infosys Springboard - Cloud and DevOps Basics',
    description: 'CI/CD pipelines, cloud fundamentals, and modern DevOps workflow essentials.',
    questionCount: 28,
  },
  {
    id: 103,
    title: 'IBM SkillsBuild - Data Science Foundations',
    description: 'Statistics, model evaluation, and practical data analysis concepts for beginners.',
    questionCount: 20,
  },
  {
    id: 104,
    title: 'IBM SkillsBuild - Cybersecurity Analyst Track',
    description: 'Threat intelligence, SOC workflows, and incident response fundamentals.',
    questionCount: 32,
  },
  {
    id: 105,
    title: 'Salesforce Trailhead - Admin Beginner',
    description: 'Objects, roles, reports, automation, and admin best practices in Salesforce.',
    questionCount: 18,
  },
  {
    id: 106,
    title: 'Salesforce Trailhead - Apex and Lightning',
    description: 'Apex triggers, governor limits, SOQL, and Lightning component foundations.',
    questionCount: 22,
  },
];

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      const apiCourses = Array.isArray(response.data) ? response.data : [];
      console.log('Fetched courses from API:', apiCourses);
      setCourses(apiCourses.length > 0 ? apiCourses : DEMO_COURSES);
    } catch (error) {
      console.error('Failed to fetch courses - using demo data:', error);
      setCourses(DEMO_COURSES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  const handleSelectCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      // Determine the course name for quiz endpoints based on the title
      const courseNameMap = {
        'Infosys Springboard - Java Foundation Certification': 'Infosys Springboard',
        'Infosys Springboard - Cloud and DevOps Basics': 'Infosys Springboard',
        'IBM SkillsBuild - Data Science Foundations':  'IBM SkillsBuild',
        'IBM SkillsBuild - Cybersecurity Analyst Track': 'IBM SkillsBuild',
        'Salesforce Trailhead - Admin Beginner': 'Salesforce Trailhead',
        'Salesforce Trailhead - Apex and Lightning': 'Salesforce Trailhead'
      };
      const courseName = courseNameMap[course.title] || course.title;
      setCourseMapping(courseId, courseName);
    }
    navigate(`/topic-selection/${courseId}`);
  };

  return (
    <div className="quiz-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="quiz-title">Select a Course</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleRefresh}
            disabled={loading || refreshing}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: refreshing ? '#cbd5e1' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            {refreshing ? '⏳ Refreshing...' : '🔄 Refresh'}
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: 'transparent',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
      
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card glass-effect">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course-info">
                <span>{course.questionCount || 0} Questions</span>
              </div>
              <button
                className="select-btn"
                onClick={() => handleSelectCourse(course.id)}
              >
                Select Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSelection;