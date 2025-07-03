
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #e0e0e0',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#666',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
  };

  const linkStyle = {
    color: '#00338D',
    textDecoration: 'none',
    marginLeft: '1rem'
  };

  return (
    <footer style={footerStyle}>
      <div>
        <span>© 2025 KPMG International. All rights reserved.</span>
      </div>
      <div>
        <a href="#" style={linkStyle}>Terms</a>
        <a href="#" style={linkStyle}>Privacy</a>
        <a href="#" style={linkStyle}>Security</a>
        <a href="#" style={linkStyle}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
