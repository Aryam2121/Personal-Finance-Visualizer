'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BudgetFormProps {
  onSubmit: (data: { month: string; category: string; limit: number }) => void;
}

export default function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [form, setForm] = useState({ month: '', category: '', limit: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...form,
      limit: parseFloat(form.limit),
    });
    setForm({ month: '', category: '', limit: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-4">
      <Input name="month" placeholder="Month (e.g., January)" value={form.month} onChange={handleChange} required />
      <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <Input type="number" name="limit" placeholder="Budget Limit" value={form.limit} onChange={handleChange} required />
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
