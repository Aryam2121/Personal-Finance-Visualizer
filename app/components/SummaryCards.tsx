import React from 'react';

interface SummaryCardsProps {
  totalExpenses: number;  // Accept number, not string
  totalTransactions: number;  // Number of transactions
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalExpenses, totalTransactions }) => {
  // Format the totalExpenses inside the component
  const formattedTotalExpenses = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalExpenses);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Total Expenses</h3>
        <p className="text-xl font-bold text-red-500">{formattedTotalExpenses}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">Total Transactions</h3>
        <p className="text-xl font-bold">{totalTransactions}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
