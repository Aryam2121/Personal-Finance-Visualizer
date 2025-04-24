'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(transactions => {
        const grouped = transactions.reduce((acc, tx) => {
          const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
          acc[month] = (acc[month] || 0) + tx.amount;
          return acc;
        }, {});
        const chartData = Object.entries(grouped).map(([month, total]) => ({ month, total }));
        setData(chartData);
      });
  }, []);

  return (
    <div className="w-full h-64 mt-4">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
