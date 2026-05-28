package com.expensetracker.repository;
import com.expensetracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(String type);
    List<Transaction> findByCategory(String category);
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'INCOME'")
    Double getTotalIncome();
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'EXPENSE'")
    Double getTotalExpense();
}
