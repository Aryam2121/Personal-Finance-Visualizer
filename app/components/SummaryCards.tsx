import React from 'react';

interface SummaryCardsProps {
  totalExpenses: number;
  recentTransactions: { description: string; amount: number }[];
  categories: Record<string, number>;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalExpenses, recentTransactions, categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Total Expenses</h3>
        <p className="text-xl font-bold text-red-500">₹{totalExpenses.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Recent Transactions</h3>
        <ul className="text-sm">
          {recentTransactions.map((tx, idx) => (
            <li key={idx}>
              {tx.description} - ₹{tx.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">By Category</h3>
        <ul className="text-sm">
          {Object.entries(categories).map(([cat, amt]) => (
            <li key={cat}>
              {cat}: ₹{amt.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryCards;
