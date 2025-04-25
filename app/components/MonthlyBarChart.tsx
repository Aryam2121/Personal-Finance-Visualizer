'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyBarChartProps {
  transactions: { date: string; amount: number }[];  // Accept transactions as prop
}

export default function MonthlyBarChart({ transactions }: MonthlyBarChartProps) {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    const grouped = transactions.reduce<{ [month: string]: number }>((acc, tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + tx.amount;
      return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([month, total]) => ({ month, total }));
    setData(chartData);
  }, [transactions]);  // Re-run whenever transactions change

  return (
    <div className="w-full h-64 mt-4">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
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
