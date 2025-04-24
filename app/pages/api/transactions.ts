import { connectToDatabase } from '@/app/lib/db';
import Transaction from '@/app/models/Transaction';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, date, description, category } = req.body;
    const transaction = await Transaction.create({ amount, date, description, category });
    return res.status(201).json(transaction);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
