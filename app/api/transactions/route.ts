// app/api/transactions/route.ts
import { connectToDatabase } from '../../lib/db';
import Transaction from '../../models/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { amount, date, description, category } = await request.json();
  const transaction = await Transaction.create({ amount, date, description, category });
  return NextResponse.json(transaction, { status: 201 });
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'Transaction ID required' }, { status: 400 });

  await Transaction.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}
