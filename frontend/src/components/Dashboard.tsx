
import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight, BarChart2, FileText, TrendingUp } from 'lucide-react';
import FinancialMetricsChart from './charts/FinancialMetricsChart';
import RevenueChart from './charts/RevenueChart';
import ProfitLossChart from './charts/ProfitLossChart';
import FinancialHealthCard from './cards/FinancialHealthCard';
import AiInsightCard from './cards/AiInsightCard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [reportGenerating, setReportGenerating] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const dashboardStyle = {
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    minHeight: 'calc(100vh - 4rem)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  };

  const chartContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '1.5rem',
    height: '350px'
  };

  const buttonStyle = {
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s'
  };

  const generateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      setReportGenerating(false);
      alert('CFO Report generated successfully! You can view it in Financial Reports section.');
    }, 3000);
  };

  if (loading) {
    return (
      <div style={{...dashboardStyle, justifyContent: 'center', alignItems: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#00338D'}}>KPMG FinancialAI</div>
          <div style={{fontSize: '1.2rem', marginBottom: '2rem', color: '#666'}}>Loading financial insights...</div>
          <div style={{width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #00338D', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'}}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <h1 style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#333'}}>Financial Dashboard</h1>
        <button 
          style={buttonStyle} 
          onClick={generateReport}
          onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#002266'}}
          onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#00338D'}}
          disabled={reportGenerating}
        >
          {reportGenerating ? 'Generating...' : 'Generate CFO Report'} 
          {reportGenerating ? null : <FileText size={18} />}
        </button>
      </div>

      <div style={{...gridStyle, gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <FinancialHealthCard 
          title="Financial Health" 
          score={85} 
          change={+3.2} 
          icon={<TrendingUp size={18} />}
        />
        <AiInsightCard 
          title="AI Insights" 
          insight="Cash flow forecast indicates 12% growth in Q3 based on current trends and seasonal adjustments."
          severity="success" 
          icon={<AlertCircle size={18} />}
        />
        <AiInsightCard 
          title="Action Items" 
          insight="Accounts receivable turnover has decreased. Consider reviewing collection policies."
          severity="warning" 
          icon={<AlertCircle size={18} />}
        />
      </div>

      <div style={{...gridStyle, gridTemplateColumns: '2fr 1fr', height: '350px'}}>
        <div style={chartContainerStyle}>
          <h3 style={{marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <BarChart2 size={18} /> Revenue and Expenses Trends
          </h3>
          <RevenueChart />
        </div>
        <div style={chartContainerStyle}>
          <h3 style={{marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <TrendingUp size={18} /> Profit & Loss Variance
          </h3>
          <ProfitLossChart />
        </div>
      </div>

      <div style={{...chartContainerStyle, height: '400px'}}>
        <h3 style={{marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between'}}>
          <div><BarChart2 size={18} /> Financial Metrics Analysis</div>
          <div style={{fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            View Detailed Analysis <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
          </div>
        </h3>
        <FinancialMetricsChart />
      </div>
    </div>
  );
};

export default Dashboard;
