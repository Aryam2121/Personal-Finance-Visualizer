'use client';
import { FC } from 'react';

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: FC<TransactionListProps> = ({ transactions, onDelete }) => {
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
            <button onClick={() => onDelete(tx._id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
