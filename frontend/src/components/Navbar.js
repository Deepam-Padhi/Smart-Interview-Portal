import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  FiHome,
  FiGrid,
  FiBookOpen,
  FiBarChart2,
  FiFileText,
  FiLayers,
  FiLogOut,
  FiMoon,
  FiSun,
  FiShield,
  FiPlusCircle
} from 'react-icons/fi';
import '../styles/layout.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar glass-effect">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">SI</span>
          <span className="logo-text">SmartInterview</span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' ? (
                <>
                  <li><Link to="/admin" className="nav-link" onClick={closeMobileMenu}><FiShield /> Admin</Link></li>
                  <li><Link to="/add-question" className="nav-link" onClick={closeMobileMenu}><FiPlusCircle /> Question</Link></li>
                  <li><Link to="/add-course" className="nav-link" onClick={closeMobileMenu}><FiLayers /> Course</Link></li>
                  <li><Link to="/admin-results" className="nav-link" onClick={closeMobileMenu}><FiBarChart2 /> Results</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/home" className="nav-link" onClick={closeMobileMenu}><FiHome /> Home</Link></li>
                  <li><Link to="/dashboard" className="nav-link" onClick={closeMobileMenu}><FiGrid /> Dashboard</Link></li>
                  <li><Link to="/quiz" className="nav-link" onClick={closeMobileMenu}><FiBookOpen /> Quiz</Link></li>
                  <li><Link to="/results" className="nav-link" onClick={closeMobileMenu}><FiBarChart2 /> Results</Link></li>
                  <li><Link to="/resume" className="nav-link" onClick={closeMobileMenu}><FiFileText /> Resume</Link></li>
                  <li><Link to="/courses" className="nav-link" onClick={closeMobileMenu}><FiLayers /> Courses</Link></li>
                </>
              )}

              <li className="nav-divider"></li>

              <li>
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                  {isDark ? <FiSun /> : <FiMoon />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </li>

              <li>
                <span className="user-email">{user?.email}</span>
              </li>

              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link" onClick={closeMobileMenu}>Login</Link></li>
              <li><Link to="/register" className="nav-link nav-link-active" onClick={closeMobileMenu}>Register</Link></li>
              <li>
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                  {isDark ? <FiSun /> : <FiMoon />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;