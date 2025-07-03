
import React from 'react';
import Layout from '../components/Layout';
import { MessageCircle, HelpCircle, FileText, FileQuestion, PlayCircle } from 'lucide-react';

const Help = () => {
  const containerStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };
  
  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 'bold'
  };
  
  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  };
  
  const iconContainerStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: '#f0f6ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem'
  };
  
  const questionStyle = {
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer'
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Help & Support</h1>
        
        <div style={containerStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>How can we assist you today?</h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                <input 
                  type="text" 
                  placeholder="Search for help topics..." 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <button style={buttonStyle}>
                <HelpCircle size={18} /> Get Support
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <div style={iconContainerStyle}>
                <FileText size={24} color="#00338D" />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Documentation</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Access comprehensive guides and documentation for all features of the platform.</p>
              <a href="#" style={{ color: '#00338D', textDecoration: 'none', fontWeight: 'bold' }}>View Documentation</a>
            </div>
            
            <div style={cardStyle}>
              <div style={iconContainerStyle}>
                <PlayCircle size={24} color="#00338D" />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Video Tutorials</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Watch step-by-step video guides to learn how to use all platform features.</p>
              <a href="#" style={{ color: '#00338D', textDecoration: 'none', fontWeight: 'bold' }}>Watch Tutorials</a>
            </div>
            
            <div style={cardStyle}>
              <div style={iconContainerStyle}>
                <FileQuestion size={24} color="#00338D" />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>FAQ</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Find answers to commonly asked questions about the platform.</p>
              <a href="#" style={{ color: '#00338D', textDecoration: 'none', fontWeight: 'bold' }}>View FAQ</a>
            </div>
            
            <div style={cardStyle}>
              <div style={iconContainerStyle}>
                <MessageCircle size={24} color="#00338D" />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Contact Support</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Reach out to our support team for personalized assistance.</p>
              <a href="#" style={{ color: '#00338D', textDecoration: 'none', fontWeight: 'bold' }}>Contact Us</a>
            </div>
          </div>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={questionStyle}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>How does the AI-powered financial analysis work?</span>
                <span>+</span>
              </h3>
              <p style={{ display: 'none' }}>
                Our AI system uses deep learning models trained on vast financial datasets to identify patterns, trends, and anomalies in your financial data. It provides automated insights, forecasts, and recommendations based on industry benchmarks and your historical performance.
              </p>
            </div>
            
            <div style={questionStyle}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>How do I connect my financial data sources?</span>
                <span>+</span>
              </h3>
              <p style={{ display: 'none' }}>
                Navigate to the "Data Sources" section in the sidebar. From there, you can add new data connections via API integration, direct database connection, or file upload. The system supports various financial data formats and integrates with most major accounting software and ERP systems.
              </p>
            </div>
            
            <div style={questionStyle}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>How accurate are the financial forecasts?</span>
                <span>+</span>
              </h3>
              <p style={{ display: 'none' }}>
                Our forecasting models maintain an average accuracy of 92-95% for short-term projections and 85-90% for long-term forecasts. Accuracy improves over time as the system learns from your data patterns. Each forecast includes confidence intervals and probability scores to help you assess reliability.
              </p>
            </div>
            
            <div style={questionStyle}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>How secure is my financial data?</span>
                <span>+</span>
              </h3>
              <p style={{ display: 'none' }}>
                We implement enterprise-grade security measures including end-to-end encryption, secure cloud infrastructure, regular security audits, and compliance with industry standards (SOC 2, GDPR, etc.). Your data is never shared with third parties, and you retain full ownership of all uploaded information.
              </p>
            </div>
            
            <div style={questionStyle}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Can I customize the CFO-ready reports?</span>
                <span>+</span>
              </h3>
              <p style={{ display: 'none' }}>
                Yes, all reports are fully customizable. You can select which sections to include, add custom metrics, adjust visualization styles, and save your preferred templates for future use. The system also supports white labeling for professional presentation purposes.
              </p>
            </div>
          </div>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Need Additional Support?</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contact Our Support Team</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Our dedicated support team is available Monday through Friday, 9 AM to 6 PM EST. We typically respond to all inquiries within 2 business hours.
              </p>
              
              <form>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subject</label>
                  <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                    <option value="">Select a topic</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Management</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
                  <textarea 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '4px',
                      minHeight: '120px'
                    }}
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email for response</label>
                  <input 
                    type="email" 
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}
                    placeholder="Your email address" 
                  />
                </div>
                
                <button style={buttonStyle} type="submit">
                  <MessageCircle size={18} /> Submit Request
                </button>
              </form>
            </div>
            
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Support Information</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Support Hours</h4>
                <p>Monday - Friday: 9 AM - 6 PM EST</p>
                <p>Weekend: Emergency support only</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Contact Information</h4>
                <p>Email: support@kpmgfinancialai.com</p>
                <p>Phone: (800) 555-1234</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Emergency Support</h4>
                <p>For urgent issues outside business hours:</p>
                <p>emergency@kpmgfinancialai.com</p>
                <p>Or call our 24/7 hotline: (800) 555-9876</p>
              </div>
              
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Resources</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{ color: '#00338D', textDecoration: 'none' }}>
                      System Status Page
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{ color: '#00338D', textDecoration: 'none' }}>
                      Release Notes & Updates
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: '#00338D', textDecoration: 'none' }}>
                      Training Calendar
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
