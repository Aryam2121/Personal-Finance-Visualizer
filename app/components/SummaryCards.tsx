'use client';
import { useEffect, useState } from 'react';

export default function SummaryCards() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const recent = transactions.slice(0, 3);
  const categories = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Total Expenses</h3>
        <p className="text-xl font-bold text-red-500">₹{total.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Recent Transactions</h3>
        <ul className="text-sm">
          {recent.map((tx, idx) => (
            <li key={idx}>
              {tx.description} - ₹{tx.amount}
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
}
