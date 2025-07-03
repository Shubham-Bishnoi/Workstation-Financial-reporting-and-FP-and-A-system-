
import React, { useState } from 'react';
import { Bell, HelpCircle, Search, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: '#00338D',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const logoStyle = {
    fontWeight: 700,
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const navStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  };

  const iconStyle = {
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const searchStyle = {
    display: showSearch ? 'flex' : 'none',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    marginRight: '1rem'
  };

  const searchInputStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    width: '150px',
    padding: '0.25rem'
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: '60px',
    right: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '1rem',
    minWidth: '200px',
    zIndex: 10,
    color: '#333'
  };

  const iconHoverStyle = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  };

  const iconLeaveStyle = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowNotifications(false);
    setShowSettings(false);
    setShowProfile(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSearch(false);
    setShowSettings(false);
    setShowProfile(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowSearch(false);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowSearch(false);
    setShowNotifications(false);
    setShowSettings(false);
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={() => navigate('/')}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>KPMG</span>
        <span style={{ fontSize: '1rem', opacity: 0.8 }}>FinancialAI</span>
      </div>
      <div style={navStyle}>
        <div style={searchStyle}>
          <input 
            style={searchInputStyle} 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                console.log(`Searching for: ${searchQuery}`);
                setSearchQuery('');
              }
            }}
          />
        </div>
        <div style={iconStyle} onClick={toggleSearch} onMouseEnter={iconHoverStyle} onMouseLeave={iconLeaveStyle}>
          <Search size={20} />
        </div>
        <div style={iconStyle} onClick={toggleNotifications} onMouseEnter={iconHoverStyle} onMouseLeave={iconLeaveStyle}>
          <Bell size={20} />
        </div>
        <div style={iconStyle} onMouseEnter={iconHoverStyle} onMouseLeave={iconLeaveStyle}>
          <HelpCircle size={20} onClick={() => navigate('/help')} />
        </div>
        <div style={iconStyle} onClick={toggleSettings} onMouseEnter={iconHoverStyle} onMouseLeave={iconLeaveStyle}>
          <Settings size={20} />
        </div>
        <div style={iconStyle} onClick={toggleProfile} onMouseEnter={iconHoverStyle} onMouseLeave={iconLeaveStyle}>
          <User size={20} />
        </div>
      </div>

      {showNotifications && (
        <div style={dropdownStyle}>
          <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Notifications</h3>
          <div style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
            <p style={{ fontWeight: 'bold' }}>Financial Report Ready</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Q3 financial report is ready for review.</p>
          </div>
          <div style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
            <p style={{ fontWeight: 'bold' }}>Cash Flow Alert</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Projected cash flow below threshold.</p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold' }}>New Forecast Available</p>
            <p style={{ fontSize: '12px', color: '#666' }}>AI has generated new forecasts for Q4.</p>
          </div>
        </div>
      )}

      {showSettings && (
        <div style={dropdownStyle}>
          <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Settings</h3>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Theme</p>
            <select style={{ width: '100%', padding: '5px', marginTop: '5px' }}>
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Notifications</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
              <input type="checkbox" checked /> Email Alerts
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
              <input type="checkbox" checked /> Push Notifications
            </label>
          </div>
          <button 
            style={{ 
              backgroundColor: '#00338D', 
              color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
        </div>
      )}

      {showProfile && (
        <div style={dropdownStyle}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#00338D', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '10px'
            }}>
              SB
            </div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Shubham</p>
              <p style={{ fontSize: '12px', color: '#666' }}>CFO</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
            <p style={{ cursor: 'pointer', padding: '5px 0' }} onClick={() => navigate('/profile')}>View Profile</p>
            <p style={{ cursor: 'pointer', padding: '5px 0' }} onClick={() => navigate('/account')}>Account Settings</p>
            <p style={{ cursor: 'pointer', padding: '5px 0', color: 'red' }}>Logout</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
