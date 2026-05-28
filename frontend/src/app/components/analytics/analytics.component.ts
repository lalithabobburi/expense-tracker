import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  transactions: Transaction[] = [];
  categoryTotals: { [key: string]: number } = {};

  constructor(private service: TransactionService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.transactions = data;
      this.calculateCategoryTotals();
    });
  }

  calculateCategoryTotals(): void {
    this.transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      this.categoryTotals[t.category] = (this.categoryTotals[t.category] || 0) + t.amount;
    });
  }

  get categoryKeys(): string[] { return Object.keys(this.categoryTotals); }

  getTotal(): number { return Object.values(this.categoryTotals).reduce((a, b) => a + b, 0); }
}
