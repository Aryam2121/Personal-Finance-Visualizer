'use client';
import { useEffect, useState } from 'react';

export default function InsightsCard() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetch('/api/budgets')
      .then(res => res.json())
      .then(budgets => {
        fetch('/api/transactions')
          .then(res => res.json())
          .then(transactions => {
            const categories = budgets.reduce((acc, budget) => {
              const actualSpending = transactions.filter(tx => tx.category === budget.category)
                .reduce((sum, tx) => sum + tx.amount, 0);
              const status = actualSpending > budget.limit ? 'Over Budget' : 'Under Budget';
              acc.push({ category: budget.category, status, actual: actualSpending, limit: budget.limit });
              return acc;
            }, []);
            setInsights(categories);
          });
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {insights.map((insight, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">{insight.category}</h3>
          <p className="text-xl">{insight.status}</p>
          <p className="text-sm">Actual: ₹{insight.actual.toFixed(2)}</p>
          <p className="text-sm">Limit: ₹{insight.limit.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
