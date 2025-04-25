// app/models/Transaction.ts
import mongoose from 'mongoose';

// Define the interface for a transaction
export interface ITransaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Export the mongoose model as the default export
export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>('Transaction', TransactionSchema);
