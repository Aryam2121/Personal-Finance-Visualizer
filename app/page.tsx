'use client';
import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyBarChart from './components/MonthlyBarChart';
import SummaryCards from './components/SummaryCards';
import { connectToDatabase } from './lib/db';
import { Transaction } from './models/Transaction';
import { formatCurrency, calculateTotal } from './lib/utils';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const handleTransactionSubmit = async (newTransaction: any) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(newTransaction),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const transaction = await res.json();
      setTransactions([...transactions, transaction]);
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleTransactionDelete = async (id: string) => {
    try {
      await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  // Calculate total expenses
  const totalExpenses = calculateTotal(transactions, 'amount');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Personal Finance Visualizer</h1>

      {/* Transaction Form */}
      <TransactionForm onSubmit={handleTransactionSubmit} />

      {/* Summary Cards */}
      <SummaryCards
        totalExpenses={formatCurrency(totalExpenses)}
        totalTransactions={transactions.length}
      />

      {/* Monthly Expenses Bar Chart */}
      <div className="my-8">
        <MonthlyBarChart transactions={transactions} />
      </div>

      {/* Transaction List */}
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
