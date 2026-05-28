import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, Stats } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> { return this.http.get<Transaction[]>(this.apiUrl); }
  getById(id: number): Observable<Transaction> { return this.http.get<Transaction>(`${this.apiUrl}/${id}`); }
  create(t: Transaction): Observable<Transaction> { return this.http.post<Transaction>(this.apiUrl, t); }
  update(id: number, t: Transaction): Observable<Transaction> { return this.http.put<Transaction>(`${this.apiUrl}/${id}`, t); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  getByType(type: string): Observable<Transaction[]> { return this.http.get<Transaction[]>(`${this.apiUrl}/type/${type}`); }
  getByCategory(category: string): Observable<Transaction[]> { return this.http.get<Transaction[]>(`${this.apiUrl}/category/${category}`); }
  getStats(): Observable<Stats> { return this.http.get<Stats>(`${this.apiUrl}/stats`); }
}
