
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Download, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BalanceSheet = () => {
  const [period, setPeriod] = useState('q3_2023');
  const [comparison, setComparison] = useState('previous_quarter');
  
  const containerStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };
  
  const buttonStyle = (isActive: boolean) => ({
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? '#00338D' : '#f0f0f0',
    color: isActive ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontSize: '0.9rem'
  });
  
  const actionButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };
  
  // Sample balance sheet data
  const balanceSheetData = {
    q3_2023: {
      assets: {
        currentAssets: {
          cash: 2500000,
          shortTermInvestments: 1500000,
          accountsReceivable: 1800000,
          inventory: 900000,
          prepaidExpenses: 300000,
          totalCurrentAssets: 7000000
        },
        nonCurrentAssets: {
          propertyPlantEquipment: 3500000,
          intangibleAssets: 1200000,
          longTermInvestments: 2500000,
          otherAssets: 800000,
          totalNonCurrentAssets: 8000000
        },
        totalAssets: 15000000
      },
      liabilities: {
        currentLiabilities: {
          accountsPayable: 1200000,
          shortTermDebt: 800000,
          accruedLiabilities: 500000,
          totalCurrentLiabilities: 2500000
        },
        nonCurrentLiabilities: {
          longTermDebt: 3500000,
          deferredTax: 700000,
          otherLiabilities: 300000,
          totalNonCurrentLiabilities: 4500000
        },
        totalLiabilities: 7000000
      },
      equity: {
        commonStock: 2000000,
        additionalPaidIn: 3000000,
        retainedEarnings: 3000000,
        totalEquity: 8000000
      }
    },
    q2_2023: {
      assets: {
        currentAssets: {
          cash: 2300000,
          shortTermInvestments: 1300000,
          accountsReceivable: 1650000,
          inventory: 950000,
          prepaidExpenses: 250000,
          totalCurrentAssets: 6450000
        },
        nonCurrentAssets: {
          propertyPlantEquipment: 3550000,
          intangibleAssets: 1250000,
          longTermInvestments: 2200000,
          otherAssets: 800000,
          totalNonCurrentAssets: 7800000
        },
        totalAssets: 14250000
      },
      liabilities: {
        currentLiabilities: {
          accountsPayable: 1100000,
          shortTermDebt: 850000,
          accruedLiabilities: 450000,
          totalCurrentLiabilities: 2400000
        },
        nonCurrentLiabilities: {
          longTermDebt: 3700000,
          deferredTax: 700000,
          otherLiabilities: 300000,
          totalNonCurrentLiabilities: 4700000
        },
        totalLiabilities: 7100000
      },
      equity: {
        commonStock: 2000000,
        additionalPaidIn: 3000000,
        retainedEarnings: 2150000,
        totalEquity: 7150000
      }
    }
  };
  
  const selectedData = balanceSheetData[period as keyof typeof balanceSheetData];
  const comparisonData = period === 'q3_2023' ? balanceSheetData.q2_2023 : null;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };
  
  const calculateChange = (current: number, previous: number) => {
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1) + '%';
  };
  
  const calculateChangeClass = (current: number, previous: number) => {
    if (!previous) return '';
    return current > previous ? 'positive' : current < previous ? 'negative' : '';
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const
  };
  
  const thStyle = {
    textAlign: 'left' as const,
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0'
  };
  
  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0'
  };
  
  const headingRow = {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold' as const
  };
  
  const subHeadingRow = {
    backgroundColor: '#fafafa',
    fontWeight: 'bold' as const
  };
  
  const totalRow = {
    fontWeight: 'bold' as const
  };
  
  const positiveChange = {
    color: '#137333'
  };
  
  const negativeChange = {
    color: '#c5221f'
  };
  
  // Chart data
  const chartData = [
    {
      name: 'Current Assets',
      current: selectedData.assets.currentAssets.totalCurrentAssets / 1000000,
      previous: comparisonData ? comparisonData.assets.currentAssets.totalCurrentAssets / 1000000 : 0
    },
    {
      name: 'Non-Current Assets',
      current: selectedData.assets.nonCurrentAssets.totalNonCurrentAssets / 1000000,
      previous: comparisonData ? comparisonData.assets.nonCurrentAssets.totalNonCurrentAssets / 1000000 : 0
    },
    {
      name: 'Current Liabilities',
      current: selectedData.liabilities.currentLiabilities.totalCurrentLiabilities / 1000000,
      previous: comparisonData ? comparisonData.liabilities.currentLiabilities.totalCurrentLiabilities / 1000000 : 0
    },
    {
      name: 'Non-Current Liabilities',
      current: selectedData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities / 1000000,
      previous: comparisonData ? comparisonData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities / 1000000 : 0
    },
    {
      name: 'Equity',
      current: selectedData.equity.totalEquity / 1000000,
      previous: comparisonData ? comparisonData.equity.totalEquity / 1000000 : 0
    }
  ];

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Balance Sheet Analysis</h1>
          <div>
            <button style={{ ...actionButtonStyle, marginRight: '0.5rem' }}>
              <Download size={18} /> Export
            </button>
            <button style={actionButtonStyle}>
              <FileText size={18} /> CFO Report
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', marginBottom: '1rem', gap: '0.5rem' }}>
          <button style={buttonStyle(period === 'q3_2023')} onClick={() => setPeriod('q3_2023')}>
            Q3 2023
          </button>
          <button style={buttonStyle(period === 'q2_2023')} onClick={() => setPeriod('q2_2023')}>
            Q2 2023
          </button>
        </div>
        
        <div style={containerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Assets & Liabilities Overview</h2>
            <div>
              <button 
                style={buttonStyle(comparison === 'previous_quarter')} 
                onClick={() => setComparison('previous_quarter')}
              >
                vs Previous Quarter
              </button>
              <button 
                style={buttonStyle(comparison === 'previous_year')} 
                onClick={() => setComparison('previous_year')}
              >
                vs Previous Year
              </button>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value}M`} />
                <Tooltip formatter={(value) => `$${value}M`} />
                <Legend />
                <Bar dataKey="current" name={`${period.toUpperCase()}`} fill="#00338D" />
                {comparisonData && <Bar dataKey="previous" name="Previous Period" fill="#82ca9d" />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Financial Position</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Item</th>
                    <th style={thStyle}>Amount</th>
                    {comparisonData && <th style={thStyle}>Change</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr style={headingRow}>
                    <td style={tdStyle}>Assets</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.assets.totalAssets)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.assets.totalAssets > comparisonData.assets.totalAssets ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.assets.totalAssets, comparisonData.assets.totalAssets)}
                      </td>
                    )}
                  </tr>
                  <tr style={subHeadingRow}>
                    <td style={{...tdStyle, paddingLeft: '2rem'}}>Current Assets</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.assets.currentAssets.totalCurrentAssets)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.assets.currentAssets.totalCurrentAssets > comparisonData.assets.currentAssets.totalCurrentAssets ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.assets.currentAssets.totalCurrentAssets, comparisonData.assets.currentAssets.totalCurrentAssets)}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td style={{...tdStyle, paddingLeft: '3rem'}}>Cash & Cash Equivalents</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.assets.currentAssets.cash)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.assets.currentAssets.cash > comparisonData.assets.currentAssets.cash ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.assets.currentAssets.cash, comparisonData.assets.currentAssets.cash)}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td style={{...tdStyle, paddingLeft: '3rem'}}>Short-term Investments</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.assets.currentAssets.shortTermInvestments)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.assets.currentAssets.shortTermInvestments > comparisonData.assets.currentAssets.shortTermInvestments ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.assets.currentAssets.shortTermInvestments, comparisonData.assets.currentAssets.shortTermInvestments)}
                      </td>
                    )}
                  </tr>
                  <tr style={subHeadingRow}>
                    <td style={{...tdStyle, paddingLeft: '2rem'}}>Non-Current Assets</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.assets.nonCurrentAssets.totalNonCurrentAssets)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.assets.nonCurrentAssets.totalNonCurrentAssets > comparisonData.assets.nonCurrentAssets.totalNonCurrentAssets ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.assets.nonCurrentAssets.totalNonCurrentAssets, comparisonData.assets.nonCurrentAssets.totalNonCurrentAssets)}
                      </td>
                    )}
                  </tr>
                  <tr style={headingRow}>
                    <td style={tdStyle}>Liabilities</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.liabilities.totalLiabilities)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.liabilities.totalLiabilities < comparisonData.liabilities.totalLiabilities ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.liabilities.totalLiabilities, comparisonData.liabilities.totalLiabilities)}
                      </td>
                    )}
                  </tr>
                  <tr style={subHeadingRow}>
                    <td style={{...tdStyle, paddingLeft: '2rem'}}>Current Liabilities</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.liabilities.currentLiabilities.totalCurrentLiabilities)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.liabilities.currentLiabilities.totalCurrentLiabilities < comparisonData.liabilities.currentLiabilities.totalCurrentLiabilities ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.liabilities.currentLiabilities.totalCurrentLiabilities, comparisonData.liabilities.currentLiabilities.totalCurrentLiabilities)}
                      </td>
                    )}
                  </tr>
                  <tr style={subHeadingRow}>
                    <td style={{...tdStyle, paddingLeft: '2rem'}}>Non-Current Liabilities</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities < comparisonData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities, comparisonData.liabilities.nonCurrentLiabilities.totalNonCurrentLiabilities)}
                      </td>
                    )}
                  </tr>
                  <tr style={headingRow}>
                    <td style={tdStyle}>Equity</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.equity.totalEquity)}</td>
                    {comparisonData && (
                      <td 
                        style={{ 
                          ...tdStyle, 
                          ...(selectedData.equity.totalEquity > comparisonData.equity.totalEquity ? positiveChange : negativeChange)
                        }}
                      >
                        {calculateChange(selectedData.equity.totalEquity, comparisonData.equity.totalEquity)}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Key Metrics</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Metric</th>
                    <th style={thStyle}>Value</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>Current Ratio</td>
                    <td style={tdStyle}>
                      {(selectedData.assets.currentAssets.totalCurrentAssets / selectedData.liabilities.currentLiabilities.totalCurrentLiabilities).toFixed(2)}
                    </td>
                    <td style={tdStyle}>
                      {selectedData.assets.currentAssets.totalCurrentAssets / selectedData.liabilities.currentLiabilities.totalCurrentLiabilities >= 1.5 ? (
                        <span style={{ color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#137333' }}></span>
                          Good
                        </span>
                      ) : selectedData.assets.currentAssets.totalCurrentAssets / selectedData.liabilities.currentLiabilities.totalCurrentLiabilities >= 1 ? (
                        <span style={{ color: '#e37400', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e37400' }}></span>
                          Adequate
                        </span>
                      ) : (
                        <span style={{ color: '#c5221f', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#c5221f' }}></span>
                          Concern
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Debt-to-Equity Ratio</td>
                    <td style={tdStyle}>
                      {(selectedData.liabilities.totalLiabilities / selectedData.equity.totalEquity).toFixed(2)}
                    </td>
                    <td style={tdStyle}>
                      {selectedData.liabilities.totalLiabilities / selectedData.equity.totalEquity <= 0.5 ? (
                        <span style={{ color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#137333' }}></span>
                          Good
                        </span>
                      ) : selectedData.liabilities.totalLiabilities / selectedData.equity.totalEquity <= 1 ? (
                        <span style={{ color: '#e37400', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e37400' }}></span>
                          Adequate
                        </span>
                      ) : (
                        <span style={{ color: '#c5221f', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#c5221f' }}></span>
                          Concern
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Working Capital</td>
                    <td style={tdStyle}>
                      {formatCurrency(selectedData.assets.currentAssets.totalCurrentAssets - selectedData.liabilities.currentLiabilities.totalCurrentLiabilities)}
                    </td>
                    <td style={tdStyle}>
                      {selectedData.assets.currentAssets.totalCurrentAssets - selectedData.liabilities.currentLiabilities.totalCurrentLiabilities > 0 ? (
                        <span style={{ color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#137333' }}></span>
                          Positive
                        </span>
                      ) : (
                        <span style={{ color: '#c5221f', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#c5221f' }}></span>
                          Negative
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Asset Turnover Ratio</td>
                    <td style={tdStyle}>1.85</td>
                    <td style={tdStyle}>
                      <span style={{ color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#137333' }}></span>
                        Good
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Return on Assets (ROA)</td>
                    <td style={tdStyle}>6.8%</td>
                    <td style={tdStyle}>
                      <span style={{ color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#137333' }}></span>
                        Above Industry Avg
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI-Powered Analysis</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Asset Utilization
              </h3>
              <p>
                Your asset turnover ratio is 1.85, which is 15% higher than the industry average of 1.6. This indicates efficient use of assets to generate revenue. If this trend continues, we project a potential 8% increase in ROA for the next fiscal year.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#e37400" /> Liquidity Risk Assessment
              </h3>
              <p>
                While your current ratio of 2.8 is healthy, the increase in accounts receivable by 9.1% compared to last quarter requires attention. Our AI recommends implementing stricter collection policies to improve cash conversion cycle by an estimated 12 days.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Capital Structure
              </h3>
              <p>
                Your debt-to-equity ratio has improved from 0.99 to 0.88 this quarter. This strengthens your balance sheet and potentially opens up additional financing opportunities. Based on current interest rates, refinancing long-term debt could save approximately $120,000 annually.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Growth Indicators
              </h3>
              <p>
                The 11.1% quarter-over-quarter growth in total assets combined with the 11.9% increase in equity suggests a sustainable growth pattern. Current investment levels in long-term assets indicate preparation for future expansion and align with your stated 5-year growth objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BalanceSheet;
