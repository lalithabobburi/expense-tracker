import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private service: TransactionService) {}

  ngOnInit(): void { this.loadTransactions(); }

  loadTransactions(): void {
    this.service.getAll().subscribe(data => this.transactions = data);
  }

  delete(id: number): void {
    if (confirm('Delete this transaction?')) {
      this.service.delete(id).subscribe(() => this.loadTransactions());
    }
  }
}
