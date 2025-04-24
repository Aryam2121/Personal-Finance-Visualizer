import { connectToDatabase } from '@/app/lib/db';
import Budget from '@/app/models/Budget';
import { NextApiRequest, NextApiResponse } from 'next';

interface BudgetRequestBody {
  month: string;
  category: string;
  limit: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const budgets = await Budget.find();
    return res.status(200).json(budgets);
  }

  if (req.method === 'POST') {
    const { month, category, limit }: BudgetRequestBody = req.body;
    const newBudget = new Budget({ month, category, limit });
    await newBudget.save();
    return res.status(201).json(newBudget);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
