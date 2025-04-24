// Helper function to format numbers as currency
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }
  
  // Helper function to calculate total of a specific field from an array of objects
  export function calculateTotal(data: any[], field: string): number {
    return data.reduce((total, item) => total + (item[field] || 0), 0);
  }
  
  // Helper function to categorize transactions by category
  export function categorizeTransactions(transactions: any[]): Record<string, number> {
    return transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});
  }
  