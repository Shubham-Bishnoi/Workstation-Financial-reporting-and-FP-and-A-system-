
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Calendar, Settings, Zap } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Forecasting = () => {
  const [forecastPeriod, setForecastPeriod] = useState('quarter');
  const [modelType, setModelType] = useState('lstm');
  const [showSettings, setShowSettings] = useState(false);
  
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
    marginRight: '0.5rem'
  });
  
  const actionButtonStyle = {
    padding: '0.75rem 1.25rem',
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
  
  // Sample data for forecasting
  const historicalData = [
    { month: 'Jan', revenue: 120000, expenses: 70000 },
    { month: 'Feb', revenue: 150000, expenses: 80000 },
    { month: 'Mar', revenue: 180000, expenses: 95000 },
    { month: 'Apr', revenue: 170000, expenses: 90000 },
    { month: 'May', revenue: 190000, expenses: 102000 },
    { month: 'Jun', revenue: 210000, expenses: 115000 }
  ];
  
  const forecastData = {
    quarter: [
      ...historicalData,
      { month: 'Jul', revenue: 225000, expenses: 122000, forecast: true },
      { month: 'Aug', revenue: 240000, expenses: 130000, forecast: true },
      { month: 'Sep', revenue: 255000, expenses: 138000, forecast: true }
    ],
    halfYear: [
      ...historicalData,
      { month: 'Jul', revenue: 225000, expenses: 122000, forecast: true },
      { month: 'Aug', revenue: 240000, expenses: 130000, forecast: true },
      { month: 'Sep', revenue: 255000, expenses: 138000, forecast: true },
      { month: 'Oct', revenue: 270000, expenses: 147000, forecast: true },
      { month: 'Nov', revenue: 285000, expenses: 155000, forecast: true },
      { month: 'Dec', revenue: 300000, expenses: 165000, forecast: true }
    ],
    year: [
      ...historicalData,
      { month: 'Jul', revenue: 225000, expenses: 122000, forecast: true },
      { month: 'Aug', revenue: 240000, expenses: 130000, forecast: true },
      { month: 'Sep', revenue: 255000, expenses: 138000, forecast: true },
      { month: 'Oct', revenue: 270000, expenses: 147000, forecast: true },
      { month: 'Nov', revenue: 285000, expenses: 155000, forecast: true },
      { month: 'Dec', revenue: 300000, expenses: 165000, forecast: true },
      { month: 'Jan', revenue: 315000, expenses: 172000, forecast: true },
      { month: 'Feb', revenue: 330000, expenses: 180000, forecast: true },
      { month: 'Mar', revenue: 345000, expenses: 188000, forecast: true },
      { month: 'Apr', revenue: 360000, expenses: 197000, forecast: true },
      { month: 'May', revenue: 375000, expenses: 205000, forecast: true },
      { month: 'Jun', revenue: 390000, expenses: 214000, forecast: true }
    ]
  };
  
  const cashFlowForecast = [
    { month: 'Jul', operating: 103000, investing: -50000, financing: -25000, net: 28000 },
    { month: 'Aug', operating: 110000, investing: -60000, financing: -25000, net: 25000 },
    { month: 'Sep', operating: 117000, investing: -55000, financing: -25000, net: 37000 },
    { month: 'Oct', operating: 123000, investing: -65000, financing: -25000, net: 33000 },
    { month: 'Nov', operating: 130000, investing: -70000, financing: -25000, net: 35000 },
    { month: 'Dec', operating: 135000, investing: -75000, financing: -25000, net: 35000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };
  
  const currentData = forecastData[forecastPeriod as keyof typeof forecastData];
  
  const renderSettings = () => {
    return (
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Forecasting Settings</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Model Type</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              style={buttonStyle(modelType === 'lstm')}
              onClick={() => setModelType('lstm')}
            >
              LSTM
            </button>
            <button 
              style={buttonStyle(modelType === 'arima')}
              onClick={() => setModelType('arima')}
            >
              ARIMA
            </button>
            <button 
              style={buttonStyle(modelType === 'prophet')}
              onClick={() => setModelType('prophet')}
            >
              Prophet
            </button>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Confidence Interval</p>
          <select style={{ padding: '0.5rem', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="95">95% (Default)</option>
            <option value="90">90%</option>
            <option value="80">80%</option>
            <option value="75">75%</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Include Seasonality</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="seasonality" checked={true} style={{ marginRight: '0.5rem' }} />
            <label htmlFor="seasonality">Account for seasonal trends in the data</label>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Include External Factors</p>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
              <input type="checkbox" id="market" checked={true} style={{ marginRight: '0.5rem' }} />
              <label htmlFor="market">Market Trends</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
              <input type="checkbox" id="inflation" checked={true} style={{ marginRight: '0.5rem' }} />
              <label htmlFor="inflation">Inflation Rate</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="industry" checked={false} style={{ marginRight: '0.5rem' }} />
              <label htmlFor="industry">Industry Growth</label>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            style={actionButtonStyle}
            onClick={() => {
              setShowSettings(false);
              // Would trigger a new forecast with these settings in a real app
            }}
          >
            <Zap size={18} /> Apply Settings
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Financial Forecasting</h1>
          <button 
            style={{ ...actionButtonStyle, backgroundColor: showSettings ? '#666' : '#00338D' }}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} /> Forecast Settings
          </button>
        </div>
        
        <div style={containerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Revenue & Expense Forecast</h2>
              <p style={{ color: '#666' }}>Based on historical data and {modelType.toUpperCase()} model</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                style={buttonStyle(forecastPeriod === 'quarter')}
                onClick={() => setForecastPeriod('quarter')}
              >
                Next Quarter
              </button>
              <button 
                style={buttonStyle(forecastPeriod === 'halfYear')}
                onClick={() => setForecastPeriod('halfYear')}
              >
                Next 6 Months
              </button>
              <button 
                style={buttonStyle(forecastPeriod === 'year')}
                onClick={() => setForecastPeriod('year')}
              >
                Next Year
              </button>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue" 
                stroke="#00338D" 
                strokeWidth={2} 
                dot={{ stroke: '#00338D', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                name="Expenses" 
                stroke="#FF8042" 
                strokeWidth={2}
                dot={{ stroke: '#FF8042', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div style={{ marginTop: '1rem', borderTop: '1px dashed #ccc', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#00338D', marginRight: '0.5rem' }}></div>
              <span>Historical Data</span>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#00338D', marginLeft: '1.5rem', marginRight: '0.5rem', border: '2px dashed #00338D' }}></div>
              <span>Forecasted Data</span>
            </div>
          </div>
          
          {showSettings && renderSettings()}
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Cash Flow Forecast</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashFlowForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="operating" name="Operating Cash Flow" fill="#8884d8" stroke="#8884d8" />
              <Area type="monotone" dataKey="investing" name="Investing Cash Flow" fill="#82ca9d" stroke="#82ca9d" />
              <Area type="monotone" dataKey="financing" name="Financing Cash Flow" fill="#ffc658" stroke="#ffc658" />
              <Area type="monotone" dataKey="net" name="Net Cash Flow" fill="#00338D" stroke="#00338D" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI Recommendations</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Revenue Optimization</h3>
              <p>Based on our forecast, we recommend focusing on Q3 marketing initiatives to capitalize on the projected growth trend. Customer segmentation analysis suggests potential for 15% higher conversion rates in the enterprise segment.</p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Expense Management</h3>
              <p>Our AI models have identified potential cost-saving opportunities in operational expenses. Implementing these recommendations could reduce monthly expenses by $15,000 without impacting productivity.</p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Cash Flow Optimization</h3>
              <p>Based on cash flow forecasting, we recommend adjusting payment terms with top vendors to improve monthly cash reserves by an estimated $30,000, providing greater financial flexibility.</p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Investment Strategy</h3>
              <p>Given the positive cash flow forecast, our models suggest this is an optimal time to increase R&D investment for long-term growth. The AI recommends allocating 12% of surplus to strategic innovations.</p>
            </div>
          </div>
          
          <button style={{ ...actionButtonStyle, marginTop: '1.5rem' }}>
            <Calendar size={18} /> Schedule Strategic Planning Meeting
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Forecasting;
