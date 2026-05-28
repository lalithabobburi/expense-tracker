# 💰 Expense Tracker with Analytics

A personal finance tracker with charts, budget alerts, and monthly reports.

---

## 🛠 Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend  | Angular 17 (standalone)  |
| Backend   | Java 17 + Spring Boot 3  |
| Database  | SQLite (via JPA)         |
| Scripts   | Python 3.10+             |

---

## 📁 Project Structure

```
expense-tracker/
├── backend/                  ← Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/expensetracker/
│       ├── ExpenseTrackerApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/TransactionController.java
│       ├── model/Transaction.java
│       ├── repository/TransactionRepository.java
│       └── service/TransactionService.java
│
├── frontend/                 ← Angular SPA
│   ├── angular.json
│   ├── package.json
│   └── src/app/
│       ├── components/
│       │   ├── dashboard/
│       │   ├── transaction-list/
│       │   ├── transaction-form/
│       │   └── analytics/
│       ├── models/transaction.model.ts
│       ├── services/transaction.service.ts
│       └── app.routes.ts
│
└── scripts/
    ├── expense_report.py     ← Monthly report + budget alerts
    └── requirements.txt
```

---

## 🚀 Getting Started

### 1. Start the Backend
```bash
cd backend
mvn spring-boot:run
```
API runs at `http://localhost:8080`

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:4200`

### 3. Run Python Report
```bash
cd scripts
python expense_report.py
python expense_report.py --budget 10000 --export
```

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description         |
|--------|-----------------------------------|---------------------|
| GET    | `/api/transactions`               | Get all             |
| GET    | `/api/transactions/{id}`          | Get by ID           |
| POST   | `/api/transactions`               | Create              |
| PUT    | `/api/transactions/{id}`          | Update              |
| DELETE | `/api/transactions/{id}`          | Delete              |
| GET    | `/api/transactions/type/{type}`   | Filter by type      |
| GET    | `/api/transactions/category/{cat}`| Filter by category  |
| GET    | `/api/transactions/stats`         | Dashboard stats     |

---

## ✨ Features

- ✅ Add, view, update, delete transactions
- 📊 Dashboard with income vs expense stats
- 📂 Category-wise expense breakdown
- 💡 Budget alerts via Python script
- 📅 Monthly trend reports
- 💾 SQLite local storage

---

## 🗄 Transaction Schema

```
id          - Auto-generated
title       - Transaction title (required)
description - Optional notes
amount      - Amount (required)
type        - INCOME | EXPENSE
category    - Food | Rent | Salary | etc.
date        - Transaction date (required)
createdAt   - Auto timestamp
updatedAt   - Auto timestamp
```go
## 📄 License

MIT License
