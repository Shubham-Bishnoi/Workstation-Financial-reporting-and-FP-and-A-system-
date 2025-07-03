
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Calendar, Bell, Lock, Save, Shield, FileText } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
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
  
  const tabButtonStyle = (isActive: boolean) => ({
    padding: '0.75rem 1rem',
    backgroundColor: isActive ? '#00338D' : '#f0f0f0',
    color: isActive ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginRight: '0.5rem'
  });
  
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    marginTop: '0.5rem',
    fontSize: '1rem'
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  backgroundColor: '#00338D',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  SB
                </div>
                <button style={{ 
                  backgroundColor: 'transparent', 
                  border: '1px solid #00338D', 
                  color: '#00338D',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Change Photo
                </button>
              </div>
              
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>First Name</label>
                    <input style={inputStyle} type="text" value="Shubham" />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Last Name</label>
                    <input style={inputStyle} type="text" value="Bishnoi" />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold' }}>Email Address</label>
                  <input style={inputStyle} type="email" value="shubham@example.com" />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Job Title</label>
                    <input style={inputStyle} type="text" value="Chief Financial Officer" />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Department</label>
                    <input style={inputStyle} type="text" value="Finance" />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold' }}>Phone Number</label>
                  <input style={inputStyle} type="tel" value="(555) 123-4567" />
                </div>
                
                <div>
                  <label style={{ fontWeight: 'bold' }}>Bio</label>
                  <textarea 
                    style={{ 
                      ...inputStyle, 
                      minHeight: '100px', 
                      resize: 'vertical' 
                    }} 
                    value="Financial executive with over 15 years of experience in corporate finance, strategic planning, and financial analysis. Specializing in driving financial growth and operational efficiency."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={buttonStyle}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dashboard & Reports</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Default Dashboard View</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="dashboard" checked />
                  <span>Financial Overview</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="dashboard" />
                  <span>Performance Analytics</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="dashboard" />
                  <span>Cash Flow Management</span>
                </label>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Reporting Preferences</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked />
                  <span>Include AI Insights in Reports</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked />
                  <span>Include Forecasting Data</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked />
                  <span>Include Historical Comparisons</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" />
                  <span>Include Industry Benchmarks</span>
                </label>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Chart Preferences</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="chart" checked />
                  <span>Bar Charts</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="chart" />
                  <span>Line Charts</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="chart" />
                  <span>Pie Charts</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="chart" />
                  <span>Area Charts</span>
                </label>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', marginTop: '2rem' }}>Appearance</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Theme</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="theme" checked />
                  <span>Light</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="theme" />
                  <span>Dark</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" name="theme" />
                  <span>System Default</span>
                </label>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={buttonStyle}>
                <Save size={18} /> Save Preferences
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Email Notifications</h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Financial Alerts</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Get notified when key financial metrics exceed thresholds</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Report Generation</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Get notified when new reports are generated</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>AI Insights</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Get notified when AI generates new insights</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Data Imports</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Get notified when data imports are completed</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>System Updates</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Get notified about platform updates and new features</p>
                  </div>
                  <div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Notification Frequency</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Financial Alert Frequency</label>
                <select style={inputStyle}>
                  <option>Real-time</option>
                  <option>Daily Digest</option>
                  <option>Weekly Summary</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Report Notification Frequency</label>
                <select style={inputStyle}>
                  <option>Real-time</option>
                  <option>Daily Digest</option>
                  <option>Weekly Summary</option>
                </select>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={buttonStyle}>
                <Save size={18} /> Save Notification Settings
              </button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Password Management</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Current Password</label>
                <input style={inputStyle} type="password" />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>New Password</label>
                <input style={inputStyle} type="password" />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Confirm New Password</label>
                <input style={inputStyle} type="password" />
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <button style={{ ...buttonStyle, backgroundColor: '#00338D' }}>
                  <Lock size={18} /> Change Password
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Two-Factor Authentication</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Shield size={24} color="#00338D" />
                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Two-Factor Authentication</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div>
                  <label className="switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f0f6ff', padding: '1rem', borderRadius: '8px', border: '1px solid #ccdeff' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00338D' }}>
                  <Shield size={18} />
                  <span>Two-factor authentication is enabled for your account. Verification method: Authenticator App</span>
                </p>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Login Sessions</h3>
              
              <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Current Session</span>
                  <span style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  <span>macOS • Chrome Browser</span>
                  <span>IP: 192.168.1.1</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <span>Started: Today, 10:45 AM</span>
                </div>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Previous Session</span>
                  <span style={{ backgroundColor: '#fce8e6', color: '#c5221f', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Ended</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  <span>iOS 14 • Safari Browser</span>
                  <span>IP: 192.168.1.100</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <span>Started: Yesterday, 4:30 PM • Ended: Yesterday, 6:15 PM</span>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <button style={{ ...buttonStyle, backgroundColor: '#c5221f' }}>
                  <Lock size={18} /> Log Out of All Other Sessions
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Profile & Settings</h1>
        
        <div style={{ display: 'flex', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button 
            style={tabButtonStyle(activeTab === 'profile')} 
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Profile
          </button>
          <button 
            style={tabButtonStyle(activeTab === 'preferences')} 
            onClick={() => setActiveTab('preferences')}
          >
            <FileText size={18} /> Preferences
          </button>
          <button 
            style={tabButtonStyle(activeTab === 'notifications')} 
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            style={tabButtonStyle(activeTab === 'security')} 
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} /> Security
          </button>
        </div>
        
        <div style={containerStyle}>
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
