
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, Download, FileText } from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PnlAnalysis = () => {
  const [period, setPeriod] = useState('q3_2023');
  const [showDetails, setShowDetails] = useState(false);
  
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
  
  // Sample P&L data
  const pnlData = {
    q3_2023: {
      revenue: 2500000,
      costOfSales: 1400000,
      grossProfit: 1100000,
      operatingExpenses: 750000,
      operatingIncome: 350000,
      otherExpenses: 50000,
      incomeTax: 75000,
      netIncome: 225000,
      details: {
        revenue: [
          { name: 'Product Sales', value: 1500000 },
          { name: 'Services', value: 800000 },
          { name: 'Subscriptions', value: 200000 }
        ],
        expenses: [
          { name: 'Cost of Sales', value: 1400000 },
          { name: 'R&D', value: 250000 },
          { name: 'Sales & Marketing', value: 300000 },
          { name: 'G&A', value: 200000 },
          { name: 'Other', value: 50000 }
        ]
      }
    },
    q2_2023: {
      revenue: 2200000,
      costOfSales: 1250000,
      grossProfit: 950000,
      operatingExpenses: 700000,
      operatingIncome: 250000,
      otherExpenses: 40000,
      incomeTax: 52500,
      netIncome: 157500,
      details: {
        revenue: [
          { name: 'Product Sales', value: 1300000 },
          { name: 'Services', value: 750000 },
          { name: 'Subscriptions', value: 150000 }
        ],
        expenses: [
          { name: 'Cost of Sales', value: 1250000 },
          { name: 'R&D', value: 225000 },
          { name: 'Sales & Marketing', value: 280000 },
          { name: 'G&A', value: 195000 },
          { name: 'Other', value: 40000 }
        ]
      }
    },
    q1_2023: {
      revenue: 2000000,
      costOfSales: 1100000,
      grossProfit: 900000,
      operatingExpenses: 650000,
      operatingIncome: 250000,
      otherExpenses: 35000,
      incomeTax: 53750,
      netIncome: 161250,
      details: {
        revenue: [
          { name: 'Product Sales', value: 1200000 },
          { name: 'Services', value: 650000 },
          { name: 'Subscriptions', value: 150000 }
        ],
        expenses: [
          { name: 'Cost of Sales', value: 1100000 },
          { name: 'R&D', value: 215000 },
          { name: 'Sales & Marketing', value: 250000 },
          { name: 'G&A', value: 185000 },
          { name: 'Other', value: 35000 }
        ]
      }
    }
  };
  
  const selectedData = pnlData[period as keyof typeof pnlData];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };
  
  const formatPercent = (value: number, base: number) => {
    return `${((value / base) * 100).toFixed(1)}%`;
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
  
  const highlightRow = {
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold' as const
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>P&L Analysis</h1>
          <div>
            <button style={{ ...actionButtonStyle, marginRight: '0.5rem' }}>
              <Download size={18} /> Export
            </button>
            <button style={actionButtonStyle}>
              <FileText size={18} /> CFO Report
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', marginBottom: '1.5rem', gap: '0.5rem' }}>
          <button style={buttonStyle(period === 'q3_2023')} onClick={() => setPeriod('q3_2023')}>
            Q3 2023
          </button>
          <button style={buttonStyle(period === 'q2_2023')} onClick={() => setPeriod('q2_2023')}>
            Q2 2023
          </button>
          <button style={buttonStyle(period === 'q1_2023')} onClick={() => setPeriod('q1_2023')}>
            Q1 2023
          </button>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Income Statement</h2>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flexGrow: 1 }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Item</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>% of Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>Revenue</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.revenue)}</td>
                    <td style={tdStyle}>100%</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Cost of Sales</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.costOfSales)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.costOfSales, selectedData.revenue)}</td>
                  </tr>
                  <tr style={highlightRow}>
                    <td style={tdStyle}>Gross Profit</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.grossProfit)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.grossProfit, selectedData.revenue)}</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Operating Expenses</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.operatingExpenses)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.operatingExpenses, selectedData.revenue)}</td>
                  </tr>
                  <tr style={highlightRow}>
                    <td style={tdStyle}>Operating Income</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.operatingIncome)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.operatingIncome, selectedData.revenue)}</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Other Expenses</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.otherExpenses)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.otherExpenses, selectedData.revenue)}</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Income Tax</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.incomeTax)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.incomeTax, selectedData.revenue)}</td>
                  </tr>
                  <tr style={{ ...highlightRow, color: '#00338D' }}>
                    <td style={tdStyle}>Net Income</td>
                    <td style={tdStyle}>{formatCurrency(selectedData.netIncome)}</td>
                    <td style={tdStyle}>{formatPercent(selectedData.netIncome, selectedData.revenue)}</td>
                  </tr>
                </tbody>
              </table>
              
              <div style={{ marginTop: '1.5rem' }}>
                <button 
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: 'transparent', 
                    border: '1px solid #00338D', 
                    color: '#00338D', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
            <div style={{ minWidth: '300px', width: '40%' }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Gross Profit', value: selectedData.grossProfit },
                      { name: 'Operating Expenses', value: selectedData.operatingExpenses },
                      { name: 'Other Expenses', value: selectedData.otherExpenses },
                      { name: 'Income Tax', value: selectedData.incomeTax },
                      { name: 'Net Income', value: selectedData.netIncome }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {selectedData.details.expenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div style={containerStyle}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Detailed Breakdown</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedData.details.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="value" name="Amount" fill="#00338D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Expense Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedData.details.expenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="value" name="Amount" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI Variance Analysis</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Revenue Insights</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Quarter-over-Quarter:</span> +13.6% increase from Q2 to Q3
              </p>
              <p>
                The increase in revenue is primarily driven by a 15.4% growth in product sales and a 33.3% growth in subscription revenue, indicating strong product-market fit and successful upselling strategies.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Expense Analysis</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Margin Impact:</span> Gross margin improved by 1.2% points
              </p>
              <p>
                While operating expenses increased by 7.1%, they decreased as a percentage of revenue, showing improved operational efficiency. Major improvements were seen in sales & marketing ROI.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Profitability Trends</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Net Income Growth:</span> +42.9% from Q2 to Q3
              </p>
              <p>
                Net profit margin increased from 7.2% to 9.0%, outperforming industry average by 2.3 percentage points. This positions the company well for the upcoming fiscal year.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Recommendations</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Focus Areas:</span> Subscription model expansion
              </p>
              <p>
                Based on the high growth and margin of subscription revenue, we recommend accelerating the transition to subscription-based offerings, with potential for 15-20% revenue uplift over next two quarters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PnlAnalysis;
