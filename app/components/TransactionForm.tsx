'use client';
import { useState } from 'react';
import { Input } from '@components/ui/input';

import { Button } from '@/components/ui/button';

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ amount: '', date: '', description: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-4">
      <Input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <Input type="date" name="date" value={form.date} onChange={handleChange} required />
      <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <Input name="category" placeholder="Category (e.g. Food)" value={form.category} onChange={handleChange} required />
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
