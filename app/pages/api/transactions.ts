import { connectToDatabase } from '@/app/lib/db';
import Transaction from '@/app/models/Transaction';
import { NextApiRequest, NextApiResponse } from 'next';

interface TransactionRequestBody {
  amount: number;
  date: string;
  description: string;
  category: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await connectToDatabase();

  if (req.method === 'GET') {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, date, description, category } = req.body as TransactionRequestBody;
    const transaction = await Transaction.create({ amount, date, description, category });
    return res.status(201).json(transaction);
  }

  if (req.method === 'DELETE') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
    await Transaction.findByIdAndDelete(id);
    res.status(204).end();
    return;
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
