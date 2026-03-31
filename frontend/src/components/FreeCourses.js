import React, { useEffect, useState } from 'react';
import { freeCourseAPI } from '../services/api';

const DEMO_FREE_COURSES = [
  {
    id: 801,
    title: 'Aptitude and Logical Reasoning Masterclass',
    description: 'Sharpen quantitative aptitude, puzzles, and reasoning for placements.',
    instructor: 'Priya Sharma',
    duration: '6 Weeks',
    link: 'https://example.com/aptitude',
  },
  {
    id: 802,
    title: 'Data Structures Interview Prep',
    description: 'Arrays, linked lists, trees, heaps, and graph patterns with mock tests.',
    instructor: 'Arjun Menon',
    duration: '8 Weeks',
    link: 'https://example.com/dsa',
  },
  {
    id: 803,
    title: 'Java + Spring Boot Crash Course',
    description: 'Build real APIs with Spring Boot, JPA, validation, and security basics.',
    instructor: 'Neha Verma',
    duration: '5 Weeks',
    link: 'https://example.com/spring',
  },
  {
    id: 804,
    title: 'Frontend Portfolio with React',
    description: 'Create polished frontend projects and deploy them for recruiter visibility.',
    instructor: 'Vikram Iyer',
    duration: '4 Weeks',
    link: 'https://example.com/react',
  },
  {
    id: 805,
    title: 'System Design for Freshers',
    description: 'Learn architecture fundamentals, scalability, and interview communication.',
    instructor: 'Kavya Rao',
    duration: '3 Weeks',
    link: 'https://example.com/system-design',
  },
];

const FreeCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await freeCourseAPI.getAll();
        const apiCourses = Array.isArray(response.data) ? response.data : [];
        setCourses(apiCourses.length > 0 ? apiCourses : DEMO_FREE_COURSES);
      } catch (err) {
        setError('Showing demo free courses for presentation mode.');
        setCourses(DEMO_FREE_COURSES);
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="free-courses-container">
      <div className="courses-header">
        <h1>Free Placement Preparation Courses</h1>
        <p>Master interview skills, data structures, and more - all for free</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {courses.length === 0 ? (
        <div className="empty-state">
          <h2>No courses available yet</h2>
          <p>Check back soon for free placement preparation courses</p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card premium">
              <div className="course-icon">🎓</div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>

              <div className="course-meta">
                {course.instructor && (
                  <p className="instructor">
                    👨‍🏫 {course.instructor}
                  </p>
                )}
                {course.duration && (
                  <p className="duration">
                    ⏱️ {course.duration}
                  </p>
                )}
              </div>

              <div className="course-badge">FREE</div>

              <a
                href={course.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="select-btn"
              >
                Enroll Now →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreeCourses;