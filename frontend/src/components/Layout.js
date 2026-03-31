import React from 'react';
import Navbar from './Navbar';
import '../styles/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 SmartInterview Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;