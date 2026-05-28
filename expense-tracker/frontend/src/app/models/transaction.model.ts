export interface Transaction {
  id?: number;
  title: string;
  description?: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Stats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  totalTransactions: number;
}
