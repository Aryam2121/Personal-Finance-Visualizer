'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#14b8a6'];

export default function CategoryPieChart() {
  interface PieData {
    name: string;
    value: number;
  }

  const [data, setData] = useState<PieData[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(transactions => {
        interface Transaction {
          category: string;
          amount: number;
        }

        interface GroupedTransactions {
          [category: string]: number;
        }

        const grouped: GroupedTransactions = transactions.reduce((acc: GroupedTransactions, tx: Transaction) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {});
        const pieData = Object.entries(grouped).map(([category, total]) => ({ name: category, value: total }));
        setData(pieData);
      });
  }, []);

  return (
    <div className="w-full h-64 mt-6">
      <h2 className="text-lg font-semibold mb-2">Spending by Category</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
