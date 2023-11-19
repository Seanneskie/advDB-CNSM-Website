import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartEx = ({ data }) => {
  console.log('Received data in BarChartEx:', data);
  
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#780107" />
    </BarChart>
  );
};

export default BarChartEx;
