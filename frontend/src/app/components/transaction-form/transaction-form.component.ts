import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  transaction: Transaction = {
    title: '', description: '', amount: 0,
    type: 'EXPENSE', category: '', date: new Date().toISOString().split('T')[0]
  };

  categories = ['Food', 'Rent', 'Salary', 'Entertainment', 'Transport', 'Healthcare', 'Shopping', 'Other'];

  constructor(private service: TransactionService, private router: Router) {}

  submit(): void {
    this.service.create(this.transaction).subscribe(() => this.router.navigate(['/transactions']));
  }
}
