import { connectToDatabase } from '@/app/lib/db';
import Budget from '@/app/models/Budget';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const budgets = await Budget.find();
    return res.status(200).json(budgets);
  }

  if (req.method === 'POST') {
    const { month, category, limit } = req.body;
    const newBudget = new Budget({ month, category, limit });
    await newBudget.save();
    return res.status(201).json(newBudget);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
