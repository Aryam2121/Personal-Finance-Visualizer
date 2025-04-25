// app/api/budgets/route.ts
import { connectToDatabase } from '../../lib/db';
import Budget from '../../models/Budget';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find().sort({ month: -1 });
  return NextResponse.json(budgets);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { category, amount, month } = await request.json();

  const existing = await Budget.findOne({ category, month });
  if (existing) {
    existing.amount = amount;
    await existing.save();
    return NextResponse.json(existing, { status: 200 });
  }

  const budget = await Budget.create({ category, amount, month });
  return NextResponse.json(budget, { status: 201 });
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'Budget ID required' }, { status: 400 });

  await Budget.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}
