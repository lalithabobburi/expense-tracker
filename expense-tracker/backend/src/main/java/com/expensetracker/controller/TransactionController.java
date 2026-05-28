package com.expensetracker.controller;
import com.expensetracker.model.Transaction;
import com.expensetracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
    @Autowired
    private TransactionService service;

    @GetMapping public List<Transaction> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public ResponseEntity<Transaction> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public Transaction create(@RequestBody Transaction t) { return service.create(t); }
    @PutMapping("/{id}") public Transaction update(@PathVariable Long id, @RequestBody Transaction t) { return service.update(id, t); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
    @GetMapping("/type/{type}") public List<Transaction> getByType(@PathVariable String type) { return service.getByType(type); }
    @GetMapping("/category/{category}") public List<Transaction> getByCategory(@PathVariable String cat) { return service.getByCategory(cat); }
    @GetMapping("/stats") public Map<String, Object> getStats() { return service.getStats(); }
}
