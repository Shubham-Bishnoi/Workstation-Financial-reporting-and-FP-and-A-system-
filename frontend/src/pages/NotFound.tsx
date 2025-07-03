
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const notFoundStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 4rem)',
    padding: '2rem',
    textAlign: 'center' as const
  };

  const headingStyle = {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#00338D',
    marginBottom: '1rem'
  };

  const textStyle = {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '2rem'
  };

  const linkStyle = {
    backgroundColor: '#00338D',
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: '600'
  };

  return (
    <Layout>
      <div style={notFoundStyle}>
        <h1 style={headingStyle}>404</h1>
        <p style={textStyle}>The page you are looking for does not exist</p>
        <a href="/" style={linkStyle}>
          Return to Dashboard
        </a>
      </div>
    </Layout>
  );
};

export default NotFound;
