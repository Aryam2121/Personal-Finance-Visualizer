'use client';

import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyBarChart from './components/MonthlyBarChart';
import SummaryCards from './components/SummaryCards';
import type { Transaction } from './models/Transaction';
import { formatCurrency, calculateTotal } from './lib/utils';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch('/api/transactions');
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleTransactionSubmit = async (newTransaction: Transaction): Promise<void> => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(newTransaction),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const transaction: Transaction = await res.json();
      setTransactions((prev) => [...prev, transaction]);
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleTransactionDelete = async (id: string): Promise<void> => {
    try {
      await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const totalExpenses = calculateTotal(transactions, 'amount');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Personal Finance Visualizer</h1>

      <TransactionForm onSubmit={handleTransactionSubmit} />

      <SummaryCards
        totalExpenses={formatCurrency(totalExpenses)}
        totalTransactions={transactions.length}
      />

      <div className="my-8">
        <MonthlyBarChart transactions={transactions} />
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <TransactionList
          transactions={transactions}
          onDelete={handleTransactionDelete}
        />
      )}
    </div>
  );
}
