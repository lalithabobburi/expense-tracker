#!/usr/bin/env python3
"""
Expense Tracker - Monthly Analysis & Budget Alerts
Author: Lalitha Bobburi
"""

import sqlite3
import argparse
from datetime import datetime, date
from collections import defaultdict

def connect_db(db_path: str):
    return sqlite3.connect(db_path)

def get_monthly_summary(conn, year: int, month: int):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT type, category, SUM(amount) as total
        FROM transactions
        WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?
        GROUP BY type, category
        ORDER BY type, total DESC
    """, (str(year), f"{month:02d}"))
    return cursor.fetchall()

def get_monthly_totals(conn, year: int, month: int):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT type, SUM(amount) as total
        FROM transactions
        WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?
        GROUP BY type
    """, (str(year), f"{month:02d}"))
    rows = cursor.fetchall()
    totals = {"INCOME": 0.0, "EXPENSE": 0.0}
    for row in rows:
        totals[row[0]] = row[1]
    return totals

def print_report(conn, year: int, month: int, budget: float = None, export: bool = False):
    month_name = date(year, month, 1).strftime("%B %Y")
    summary = get_monthly_summary(conn, year, month)
    totals = get_monthly_totals(conn, year, month)

    lines = []
    lines.append("=" * 55)
    lines.append(f"  📊 EXPENSE REPORT — {month_name}")
    lines.append("=" * 55)

    income = totals.get("INCOME", 0)
    expense = totals.get("EXPENSE", 0)
    balance = income - expense

    lines.append(f"\n💚 Total Income  : ₹{income:>10.2f}")
    lines.append(f"❤️  Total Expense : ₹{expense:>10.2f}")
    lines.append(f"💰 Balance       : ₹{balance:>10.2f}")

    # Budget alert
    if budget:
        percent = (expense / budget) * 100
        lines.append(f"\n⚠️  Budget Used: {percent:.1f}% of ₹{budget:.2f}")
        if percent > 90:
            lines.append("🚨 ALERT: You have exceeded 90% of your budget!")
        elif percent > 75:
            lines.append("⚠️  WARNING: You have used 75% of your budget.")

    # Category breakdown
    lines.append("\n📂 EXPENSE BREAKDOWN BY CATEGORY")
    lines.append("-" * 40)
    expense_rows = [(r[1], r[2]) for r in summary if r[0] == "EXPENSE"]
    for cat, total in expense_rows:
        bar_len = int((total / expense * 30)) if expense > 0 else 0
        bar = "█" * bar_len
        lines.append(f"  {cat:<15} {bar:<30} ₹{total:.2f}")

    lines.append("\n" + "=" * 55)

    report_text = "\n".join(lines)
    print(report_text)

    if export:
        filename = f"report_{year}_{month:02d}.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(report_text)
        print(f"\n✅ Report saved to {filename}")

def main():
    parser = argparse.ArgumentParser(description="Expense Tracker Report Generator")
    parser.add_argument("--db", default="../backend/expense-tracker.db", help="Path to SQLite DB")
    parser.add_argument("--year", type=int, default=datetime.now().year)
    parser.add_argument("--month", type=int, default=datetime.now().month)
    parser.add_argument("--budget", type=float, help="Monthly budget limit")
    parser.add_argument("--export", action="store_true", help="Export report to .txt file")
    args = parser.parse_args()

    conn = connect_db(args.db)
    print_report(conn, args.year, args.month, args.budget, args.export)
    conn.close()

if __name__ == "__main__":
    main()
