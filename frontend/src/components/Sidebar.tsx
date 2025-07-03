
import React, { useState } from 'react';
import { BarChart, FileSpreadsheet, FileText, Home, LayoutDashboard, PieChart, TrendingUp, Calendar, Database, FileInput } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current path without the leading slash
  const currentPath = location.pathname.substring(1) || 'dashboard';
  const [activeItem, setActiveItem] = useState(currentPath);
  
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#f5f5f5',
    height: 'calc(100vh - 4rem)',
    borderRight: '1px solid #e0e0e0',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const
  };
  
  const menuContainerStyle = {
    padding: '1rem 0',
    flexGrow: 1,
    overflowY: 'auto' as const
  };
  
  const menuItemStyle = (isActive: boolean) => ({
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    backgroundColor: isActive ? '#00338D' : 'transparent',
    color: isActive ? 'white' : '#333',
    transition: 'all 0.2s ease',
    borderLeft: isActive ? '4px solid #00a0df' : '4px solid transparent'
  });
  
  const menuItems = [
    { name: 'Dashboard', path: '', icon: <LayoutDashboard size={18} /> },
    { name: 'Financial Reports', path: 'reports', icon: <FileText size={18} /> },
    { name: 'Data Sources', path: 'sources', icon: <Database size={18} /> },
    { name: 'Data Import', path: 'import', icon: <FileInput size={18} /> },
    { name: 'Analytics', path: 'analytics', icon: <BarChart size={18} /> },
    { name: 'Forecasting', path: 'forecasting', icon: <TrendingUp size={18} /> },
    { name: 'P&L Analysis', path: 'pnl', icon: <PieChart size={18} /> },
    { name: 'Balance Sheet', path: 'balance', icon: <FileSpreadsheet size={18} /> },
    { name: 'Cash Flow', path: 'cashflow', icon: <Calendar size={18} /> }
  ];
  
  const handleItemClick = (itemName: string, path: string) => {
    setActiveItem(itemName);
    navigate(`/${path}`);
  };
  
  return (
    <div style={sidebarStyle} className="sidebar">
      <div style={menuContainerStyle}>
        {menuItems.map(item => (
          <div 
            key={item.name}
            style={menuItemStyle(activeItem === (item.path || 'dashboard'))}
            onClick={() => handleItemClick(item.path || 'dashboard', item.path)}
            onMouseEnter={(e) => {
              if (activeItem !== (item.path || 'dashboard')) {
                e.currentTarget.style.backgroundColor = '#eaeaea';
              }
            }}
            onMouseLeave={(e) => {
              if (activeItem !== (item.path || 'dashboard')) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div style={{padding: '1rem', borderTop: '1px solid #e0e0e0', textAlign: 'center', fontSize: '0.8rem', color: '#888'}}>
        KPMG AI Financial Solutions v1.0
      </div>
    </div>
  );
};

export default Sidebar;
