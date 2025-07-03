
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Download } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  
  const containerStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };
  
  const buttonStyle = {
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
  
  const tabButtonStyle = (isActive: boolean) => ({
    padding: '0.75rem 1.25rem',
    backgroundColor: isActive ? '#00338D' : '#f0f0f0',
    color: isActive ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '0.5rem'
  });
  
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', value: 120000 },
    { month: 'Feb', value: 150000 },
    { month: 'Mar', value: 180000 },
    { month: 'Apr', value: 170000 },
    { month: 'May', value: 190000 },
    { month: 'Jun', value: 210000 },
    { month: 'Jul', value: 230000 },
    { month: 'Aug', value: 210000 },
    { month: 'Sep', value: 240000 },
    { month: 'Oct', value: 260000 },
    { month: 'Nov', value: 250000 },
    { month: 'Dec', value: 280000 }
  ];
  
  const expenseData = [
    { name: 'Operations', value: 45 },
    { name: 'Marketing', value: 25 },
    { name: 'R&D', value: 15 },
    { name: 'Admin', value: 10 },
    { name: 'Other', value: 5 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const profitData = [
    { month: 'Jan', gross: 120000, net: 50000 },
    { month: 'Feb', gross: 150000, net: 70000 },
    { month: 'Mar', gross: 180000, net: 85000 },
    { month: 'Apr', gross: 170000, net: 80000 },
    { month: 'May', gross: 190000, net: 88000 },
    { month: 'Jun', gross: 210000, net: 95000 },
    { month: 'Jul', gross: 230000, net: 105000 },
    { month: 'Aug', gross: 210000, net: 95000 },
    { month: 'Sep', gross: 240000, net: 110000 },
    { month: 'Oct', gross: 260000, net: 120000 },
    { month: 'Nov', gross: 250000, net: 115000 },
    { month: 'Dec', gross: 280000, net: 130000 }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };
  
  const renderChart = () => {
    switch (activeTab) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="value" name="Revenue" fill="#00338D" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'expenses':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'profit':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="gross" name="Gross Profit" stroke="#00338D" strokeWidth={2} />
              <Line type="monotone" dataKey="net" name="Net Profit" stroke="#00a0df" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Analytics Dashboard</h1>
          <button style={buttonStyle}>
            <Download size={18} /> Export Reports
          </button>
        </div>
        
        <div style={containerStyle}>
          <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
            <button style={tabButtonStyle(activeTab === 'revenue')} onClick={() => setActiveTab('revenue')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChartIcon size={18} /> Revenue Analysis
              </div>
            </button>
            <button style={tabButtonStyle(activeTab === 'expenses')} onClick={() => setActiveTab('expenses')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PieChartIcon size={18} /> Expense Breakdown
              </div>
            </button>
            <button style={tabButtonStyle(activeTab === 'profit')} onClick={() => setActiveTab('profit')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LineChartIcon size={18} /> Profit Trends
              </div>
            </button>
          </div>
          
          {renderChart()}
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI-Powered Insights</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Revenue Analysis</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Growth Rate:</span> +15.4% YoY
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Monthly Average:</span> $207,500
              </p>
              <p>
                Revenue shows consistent growth with seasonal peaks in December. Q4 performance exceeds expectations by 12%.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Expense Optimization</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Largest Category:</span> Operations (45%)
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Potential Savings:</span> $45,000/month
              </p>
              <p>
                AI analysis suggests potential cost reductions in operational expenses by optimizing resource allocation.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Profit Margin</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Gross Margin:</span> 58%
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Net Margin:</span> 45%
              </p>
              <p>
                Net profit margin has improved by 3.2% compared to the previous year, indicating increased operational efficiency.
              </p>
            </div>
            
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Projections</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Next Quarter:</span> +8.5% growth expected
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Annual Projection:</span> $2.85M total revenue
              </p>
              <p>
                Based on current trends and market conditions, we project continued growth with Q1 being the strongest performer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
