package com.expensetracker.service;
import com.expensetracker.model.Transaction;
import com.expensetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repo;

    public List<Transaction> getAll() { return repo.findAll(); }
    public Optional<Transaction> getById(Long id) { return repo.findById(id); }
    public Transaction create(Transaction t) { return repo.save(t); }
    public Transaction update(Long id, Transaction updated) {
        return repo.findById(id).map(t -> {
            t.setTitle(updated.getTitle()); t.setDescription(updated.getDescription());
            t.setAmount(updated.getAmount()); t.setType(updated.getType());
            t.setCategory(updated.getCategory()); t.setDate(updated.getDate());
            return repo.save(t);
        }).orElseThrow(() -> new RuntimeException("Not found"));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public List<Transaction> getByType(String type) { return repo.findByType(type); }
    public List<Transaction> getByCategory(String cat) { return repo.findByCategory(cat); }
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        Double income = repo.getTotalIncome();
        Double expense = repo.getTotalExpense();
        stats.put("totalIncome", income != null ? income : 0.0);
        stats.put("totalExpense", expense != null ? expense : 0.0);
        stats.put("balance", (income != null ? income : 0.0) - (expense != null ? expense : 0.0));
        stats.put("totalTransactions", repo.count());
        return stats;
    }
}
