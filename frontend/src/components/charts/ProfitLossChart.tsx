
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ProfitLossChart = () => {
  const data = [
    { name: 'Gross Profit', value: 60 },
    { name: 'Operating Expenses', value: 25 },
    { name: 'Net Profit', value: 15 }
  ];

  const COLORS = ['#00338D', '#00a0df', '#005eb8'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: any) => [`${value}%`, undefined]}
          contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }} 
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProfitLossChart;
