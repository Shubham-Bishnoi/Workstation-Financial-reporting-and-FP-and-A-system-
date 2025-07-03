
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: 'Jan', revenue: 4000, expenses: 2400, forecast: 4200 },
    { name: 'Feb', revenue: 3000, expenses: 1398, forecast: 3100 },
    { name: 'Mar', revenue: 2000, expenses: 9800, forecast: 2100 },
    { name: 'Apr', revenue: 2780, expenses: 3908, forecast: 2900 },
    { name: 'May', revenue: 1890, expenses: 4800, forecast: 2000 },
    { name: 'Jun', revenue: 2390, expenses: 3800, forecast: 2500 },
    { name: 'Jul', revenue: 3490, expenses: 4300, forecast: 3600 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }} 
          formatter={(value: any) => [`$${value.toLocaleString()}`, undefined]}
        />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="#00338D" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#e74c3c" radius={[4, 4, 0, 0]} />
        <Bar dataKey="forecast" name="Forecast" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
