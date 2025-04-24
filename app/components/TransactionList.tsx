'use client';
import { useEffect, useState } from 'react';

export default function TransactionList() {
  interface Transaction {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
    setTransactions(transactions.filter(tx => tx._id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map(tx => (
          <li key={tx._id} className="flex justify-between items-center border p-2 rounded-md">
            <div>
              <p className="font-medium">{tx.description}</p>
              <p className="text-sm text-gray-500">
                ₹{tx.amount} | {new Date(tx.date).toLocaleDateString()} | {tx.category}
              </p>
            </div>
            <button onClick={() => deleteTransaction(tx._id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
