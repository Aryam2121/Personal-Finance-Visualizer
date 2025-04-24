'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetVsActualChart() {
  const [budgetData, setBudgetData] = useState([]);
  const [actualData, setActualData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/budgets').then(res => res.json()),
      fetch('/api/transactions').then(res => res.json())
    ])
      .then(([budgets, transactions]) => {
        const budgetMap = budgets.reduce((acc, budget) => {
          acc[budget.category] = budget.limit;
          return acc;
        }, {});

        const actualMap = transactions.reduce((acc, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {});

        const data = Object.keys(budgetMap).map(category => ({
          category,
          budget: budgetMap[category],
          actual: actualMap[category] || 0,
        }));

        setBudgetData(data);
      });
  }, []);

  return (
    <div className="w-full h-64 mt-6">
      <h2 className="text-lg font-semibold mb-2">Budget vs Actual Spending</h2>
      <ResponsiveContainer>
        <BarChart data={budgetData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#3b82f6" />
          <Bar dataKey="actual" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
