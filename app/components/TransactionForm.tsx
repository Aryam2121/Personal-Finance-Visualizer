'use client';
import { useState } from 'react';
import { Input } from '@components/ui/input';
import { Button } from '@/components/ui/button';

type FormState = {
  amount: string;
  date: string;
  description: string;
  category: string;
};

interface TransactionFormProps {
  onSubmit: (form: FormState) => void;
}

const defaultForm: FormState = {
  amount: '',
  date: '',
  description: '',
  category: '',
};

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [form, setForm] = useState<FormState>(defaultForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-6 bg-white rounded-lg shadow-md ">
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm font-medium">Amount</label>
        <Input
          type="number"
          id="amount"
          name="amount"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium">Date</label>
        <Input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Input
          type="text"
          id="category"
          name="category"
          placeholder="e.g. Food, Travel"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Add Transaction
      </Button>
    </form>
  );
}
