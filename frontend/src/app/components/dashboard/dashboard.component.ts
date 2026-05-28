import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Stats } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: Stats = { totalIncome: 0, totalExpense: 0, balance: 0, totalTransactions: 0 };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getStats().subscribe(s => this.stats = s);
  }
}
