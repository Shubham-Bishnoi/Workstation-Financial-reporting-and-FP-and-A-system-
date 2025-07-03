import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Download, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, Cell } from 'recharts';

const CashFlow = () => {
  const [period, setPeriod] = useState('last_year');
  
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
  
  const cashFlowData = {
    last_year: [
      { month: 'Jan', operating: 350000, investing: -120000, financing: -50000, netCashFlow: 180000, cashBalance: 2500000 },
      { month: 'Feb', operating: 380000, investing: -150000, financing: -50000, netCashFlow: 180000, cashBalance: 2680000 },
      { month: 'Mar', operating: 420000, investing: -200000, financing: 150000, netCashFlow: 370000, cashBalance: 3050000 },
      { month: 'Apr', operating: 390000, investing: -180000, financing: -50000, netCashFlow: 160000, cashBalance: 3210000 },
      { month: 'May', operating: 410000, investing: -150000, financing: -50000, netCashFlow: 210000, cashBalance: 3420000 },
      { month: 'Jun', operating: 450000, investing: -200000, financing: -100000, netCashFlow: 150000, cashBalance: 3570000 },
      { month: 'Jul', operating: 430000, investing: -220000, financing: -50000, netCashFlow: 160000, cashBalance: 3730000 },
      { month: 'Aug', operating: 440000, investing: -180000, financing: -50000, netCashFlow: 210000, cashBalance: 3940000 },
      { month: 'Sep', operating: 470000, investing: -230000, financing: -50000, netCashFlow: 190000, cashBalance: 4130000 },
      { month: 'Oct', operating: 490000, investing: -250000, financing: -50000, netCashFlow: 190000, cashBalance: 4320000 },
      { month: 'Nov', operating: 510000, investing: -270000, financing: 200000, netCashFlow: 440000, cashBalance: 4760000 },
      { month: 'Dec', operating: 580000, investing: -350000, financing: -100000, netCashFlow: 130000, cashBalance: 4890000 }
    ],
    current_quarter: [
      { month: 'Jul', operating: 430000, investing: -220000, financing: -50000, netCashFlow: 160000, cashBalance: 3730000 },
      { month: 'Aug', operating: 440000, investing: -180000, financing: -50000, netCashFlow: 210000, cashBalance: 3940000 },
      { month: 'Sep', operating: 470000, investing: -230000, financing: -50000, netCashFlow: 190000, cashBalance: 4130000 }
    ]
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
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };
  
  const selectedData = cashFlowData[period as keyof typeof cashFlowData];
  
  const cashFlowBreakdown = {
    operating: {
      inflows: [
        { name: 'Cash from Sales', value: 2100000 },
        { name: 'Other Operating Income', value: 180000 }
      ],
      outflows: [
        { name: 'Supplier Payments', value: -850000 },
        { name: 'Employee Salaries', value: -650000 },
        { name: 'Taxes', value: -250000 },
        { name: 'Other Operating Expenses', value: -130000 }
      ]
    },
    investing: {
      inflows: [
        { name: 'Sale of Assets', value: 50000 },
        { name: 'Investment Returns', value: 120000 }
      ],
      outflows: [
        { name: 'Equipment Purchases', value: -380000 },
        { name: 'Software Development', value: -220000 },
        { name: 'Long-term Investments', value: -450000 }
      ]
    },
    financing: {
      inflows: [
        { name: 'Loans', value: 350000 },
        { name: 'Equity Investment', value: 200000 }
      ],
      outflows: [
        { name: 'Loan Repayments', value: -250000 },
        { name: 'Dividends', value: -150000 },
        { name: 'Interest Paid', value: -100000 }
      ]
    }
  };
  
  const barChartColors = {
    operating: '#00338D',
    investing: '#FF8042',
    financing: '#82ca9d',
    netCashFlow: '#8884d8'
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Cash Flow Analysis</h1>
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
          <button 
            style={buttonStyle(period === 'last_year')}
            onClick={() => setPeriod('last_year')}
          >
            Last 12 Months
          </button>
          <button 
            style={buttonStyle(period === 'current_quarter')}
            onClick={() => setPeriod('current_quarter')}
          >
            Current Quarter
          </button>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Cash Flow Statement</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={selectedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar yAxisId="left" dataKey="operating" name="Operating Cash Flow" fill={barChartColors.operating} />
                <Bar yAxisId="left" dataKey="investing" name="Investing Cash Flow" fill={barChartColors.investing} />
                <Bar yAxisId="left" dataKey="financing" name="Financing Cash Flow" fill={barChartColors.financing} />
                <Line yAxisId="left" type="monotone" dataKey="netCashFlow" name="Net Cash Flow" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8' }} />
                <Line yAxisId="right" type="monotone" dataKey="cashBalance" name="Cash Balance" stroke="#00a0df" strokeWidth={2} dot={{ fill: '#00a0df' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Period</th>
                  <th style={thStyle}>Operating</th>
                  <th style={thStyle}>Investing</th>
                  <th style={thStyle}>Financing</th>
                  <th style={thStyle}>Net Cash Flow</th>
                  <th style={thStyle}>Ending Cash Balance</th>
                </tr>
              </thead>
              <tbody>
                {period === 'last_year' ? (
                  <>
                    <tr>
                      <td style={tdStyle}>Q1</td>
                      <td style={tdStyle}>{formatCurrency(1150000)}</td>
                      <td style={tdStyle}>{formatCurrency(-470000)}</td>
                      <td style={tdStyle}>{formatCurrency(50000)}</td>
                      <td style={tdStyle}>{formatCurrency(730000)}</td>
                      <td style={tdStyle}>{formatCurrency(3050000)}</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Q2</td>
                      <td style={tdStyle}>{formatCurrency(1250000)}</td>
                      <td style={tdStyle}>{formatCurrency(-530000)}</td>
                      <td style={tdStyle}>{formatCurrency(-200000)}</td>
                      <td style={tdStyle}>{formatCurrency(520000)}</td>
                      <td style={tdStyle}>{formatCurrency(3570000)}</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Q3</td>
                      <td style={tdStyle}>{formatCurrency(1340000)}</td>
                      <td style={tdStyle}>{formatCurrency(-630000)}</td>
                      <td style={tdStyle}>{formatCurrency(-150000)}</td>
                      <td style={tdStyle}>{formatCurrency(560000)}</td>
                      <td style={tdStyle}>{formatCurrency(4130000)}</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Q4</td>
                      <td style={tdStyle}>{formatCurrency(1580000)}</td>
                      <td style={tdStyle}>{formatCurrency(-870000)}</td>
                      <td style={tdStyle}>{formatCurrency(50000)}</td>
                      <td style={tdStyle}>{formatCurrency(760000)}</td>
                      <td style={tdStyle}>{formatCurrency(4890000)}</td>
                    </tr>
                    <tr style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                      <td style={tdStyle}>Total</td>
                      <td style={tdStyle}>{formatCurrency(5320000)}</td>
                      <td style={tdStyle}>{formatCurrency(-2500000)}</td>
                      <td style={tdStyle}>{formatCurrency(-250000)}</td>
                      <td style={tdStyle}>{formatCurrency(2570000)}</td>
                      <td style={tdStyle}>-</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td style={tdStyle}>July</td>
                      <td style={tdStyle}>{formatCurrency(430000)}</td>
                      <td style={tdStyle}>{formatCurrency(-220000)}</td>
                      <td style={tdStyle}>{formatCurrency(-50000)}</td>
                      <td style={tdStyle}>{formatCurrency(160000)}</td>
                      <td style={tdStyle}>{formatCurrency(3730000)}</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>August</td>
                      <td style={tdStyle}>{formatCurrency(440000)}</td>
                      <td style={tdStyle}>{formatCurrency(-180000)}</td>
                      <td style={tdStyle}>{formatCurrency(-50000)}</td>
                      <td style={tdStyle}>{formatCurrency(210000)}</td>
                      <td style={tdStyle}>{formatCurrency(3940000)}</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>September</td>
                      <td style={tdStyle}>{formatCurrency(470000)}</td>
                      <td style={tdStyle}>{formatCurrency(-230000)}</td>
                      <td style={tdStyle}>{formatCurrency(-50000)}</td>
                      <td style={tdStyle}>{formatCurrency(190000)}</td>
                      <td style={tdStyle}>{formatCurrency(4130000)}</td>
                    </tr>
                    <tr style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                      <td style={tdStyle}>Q3 Total</td>
                      <td style={tdStyle}>{formatCurrency(1340000)}</td>
                      <td style={tdStyle}>{formatCurrency(-630000)}</td>
                      <td style={tdStyle}>{formatCurrency(-150000)}</td>
                      <td style={tdStyle}>{formatCurrency(560000)}</td>
                      <td style={tdStyle}>-</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Cash Flow Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f5f9ff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Free Cash Flow</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatCurrency(2820000)}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f5f9ff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Cash Conversion Ratio</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>0.85</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f5f9ff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Cash Flow to Debt Ratio</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>1.52</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f5f9ff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Cash Flow Coverage Ratio</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>3.2</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Cash Flow Breakdown</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: barChartColors.operating }}>Operating Activities</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[...cashFlowBreakdown.operating.inflows, ...cashFlowBreakdown.operating.outflows]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tickFormatter={(value) => `$${Math.abs(value)/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="value" fill={barChartColors.operating}>
                    {[...cashFlowBreakdown.operating.inflows, ...cashFlowBreakdown.operating.outflows].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 0 ? barChartColors.operating : '#003366'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>Net Operating Cash Flow: {formatCurrency(400000)}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Strong revenue collection with efficient operational spending contributed to healthy operating cash flow.</p>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: barChartColors.investing }}>Investing Activities</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[...cashFlowBreakdown.investing.inflows, ...cashFlowBreakdown.investing.outflows]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tickFormatter={(value) => `$${Math.abs(value)/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="value" fill={barChartColors.investing}>
                    {[...cashFlowBreakdown.investing.inflows, ...cashFlowBreakdown.investing.outflows].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 0 ? barChartColors.investing : '#CC6600'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>Net Investing Cash Flow: {formatCurrency(-880000)}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Significant investments in equipment and long-term growth initiatives indicate preparation for future expansion.</p>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: barChartColors.financing }}>Financing Activities</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[...cashFlowBreakdown.financing.inflows, ...cashFlowBreakdown.financing.outflows]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tickFormatter={(value) => `$${Math.abs(value)/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="value" fill={barChartColors.financing}>
                    {[...cashFlowBreakdown.financing.inflows, ...cashFlowBreakdown.financing.outflows].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 0 ? barChartColors.financing : '#006633'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>Net Financing Cash Flow: {formatCurrency(50000)}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Balanced financing approach with strategic loans and equity investments offsetting repayments and dividends.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI-Powered Cash Flow Analysis</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Cash Cycle Optimization
              </h3>
              <p>
                Our AI analysis has identified a potential 15% improvement in cash conversion cycle through optimized inventory management and receivables collection processes. This could free up an estimated $350,000 in working capital.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} color="#e37400" /> Seasonality Impact
              </h3>
              <p>
                Seasonal patterns show Q4 typically produces 35% higher operating cash flow than other quarters. We recommend building adequate reserves in Q3 to maximize growth opportunities during the upcoming seasonal peak.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Investment Strategy
              </h3>
              <p>
                With current cash reserves 21% above optimal working capital requirements, the company has capacity for additional strategic investments. Our AI models suggest prioritizing technology infrastructure investments for highest ROI potential.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#00338D" /> Forecast Accuracy
              </h3>
              <p>
                Our cash flow forecasting model has maintained 92% accuracy over the past 12 months. Based on current trends and market conditions, we project a 12-15% increase in operating cash flow for the coming fiscal year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CashFlow;
