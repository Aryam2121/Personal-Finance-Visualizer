'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BudgetForm({ onSubmit }) {
  const [form, setForm] = useState({ month: '', category: '', limit: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
