
import React, { ReactNode } from 'react';

interface FinancialHealthCardProps {
  title: string;
  score: number;
  change: number;
  icon: ReactNode;
}

const FinancialHealthCard = ({ title, score, change, icon }: FinancialHealthCardProps) => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  };
  
  const scoreStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold' as const,
    marginBottom: '0.5rem',
    color: score > 80 ? '#2ecc71' : score > 50 ? '#f39c12' : '#e74c3c'
  };
  
  const changeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.9rem',
    fontWeight: '500' as const,
    color: change >= 0 ? '#2ecc71' : '#e74c3c'
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    color: '#555',
    fontWeight: '600' as const
  };
  
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>
        {icon}
        {title}
      </div>
      <div style={scoreStyle}>{score}/100</div>
      <div style={changeStyle}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
      </div>
      <div style={{marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f0f0f0', fontSize: '0.85rem', color: '#888'}}>
        Based on 24 financial indicators
      </div>
    </div>
  );
};

export default FinancialHealthCard;
