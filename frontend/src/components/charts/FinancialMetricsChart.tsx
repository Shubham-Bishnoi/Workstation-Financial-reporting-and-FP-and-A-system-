
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialMetricsChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated financial data
    const simulatedData = [
      { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600, forecastRevenue: 4100, forecastExpenses: 2500 },
      { month: 'Feb', revenue: 4200, expenses: 2500, profit: 1700, forecastRevenue: 4300, forecastExpenses: 2400 },
      { month: 'Mar', revenue: 5000, expenses: 2600, profit: 2400, forecastRevenue: 5100, forecastExpenses: 2700 },
      { month: 'Apr', revenue: 4800, expenses: 2700, profit: 2100, forecastRevenue: 4900, forecastExpenses: 2800 },
      { month: 'May', revenue: 5200, expenses: 2900, profit: 2300, forecastRevenue: 5300, forecastExpenses: 3000 },
      { month: 'Jun', revenue: 5500, expenses: 3000, profit: 2500, forecastRevenue: 5600, forecastExpenses: 3100 },
      { month: 'Jul', revenue: 5700, expenses: 3100, profit: 2600, forecastRevenue: 5800, forecastExpenses: 3200 },
      { month: 'Aug', revenue: null, expenses: null, profit: null, forecastRevenue: 6000, forecastExpenses: 3300 },
      { month: 'Sep', revenue: null, expenses: null, profit: null, forecastRevenue: 6300, forecastExpenses: 3400 },
      { month: 'Oct', revenue: null, expenses: null, profit: null, forecastRevenue: 6500, forecastExpenses: 3500 },
      { month: 'Nov', revenue: null, expenses: null, profit: null, forecastRevenue: 6800, forecastExpenses: 3600 },
      { month: 'Dec', revenue: null, expenses: null, profit: null, forecastRevenue: 7000, forecastExpenses: 3700 },
    ];
    
    // Simulate data loading
    setTimeout(() => {
      setData(simulatedData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading financial metrics...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
          formatter={(value: any) => [`$${value.toLocaleString()}`, undefined]}
        />
        <Legend verticalAlign="top" height={36} />
        <Line 
          name="Revenue" 
          type="monotone" 
          dataKey="revenue" 
          stroke="#00338D" 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6, stroke: '#00338D', strokeWidth: 2, fill: 'white' }} 
        />
        <Line 
          name="Expenses" 
          type="monotone" 
          dataKey="expenses" 
          stroke="#e74c3c" 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6, stroke: '#e74c3c', strokeWidth: 2, fill: 'white' }} 
        />
        <Line 
          name="Profit" 
          type="monotone" 
          dataKey="profit" 
          stroke="#2ecc71" 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6, stroke: '#2ecc71', strokeWidth: 2, fill: 'white' }} 
        />
        <Line 
          name="Revenue Forecast" 
          type="monotone" 
          dataKey="forecastRevenue" 
          stroke="#00338D" 
          strokeWidth={2} 
          strokeDasharray="5 5" 
          dot={{ r: 4 }} 
          activeDot={{ r: 6, stroke: '#00338D', strokeWidth: 2, fill: 'white' }} 
        />
        <Line 
          name="Expenses Forecast" 
          type="monotone" 
          dataKey="forecastExpenses" 
          stroke="#e74c3c" 
          strokeWidth={2} 
          strokeDasharray="5 5" 
          dot={{ r: 4 }} 
          activeDot={{ r: 6, stroke: '#e74c3c', strokeWidth: 2, fill: 'white' }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinancialMetricsChart;
