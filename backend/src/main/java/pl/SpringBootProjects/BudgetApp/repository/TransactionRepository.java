package pl.SpringBootProjects.BudgetApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByAccountId(int id);

    List<Transaction> findByCategory(Category category);

    @Query("SELECT t FROM Transaction t WHERE t.isRecurring = true")
    List<Transaction> findRecurringTransactionToProcess();
}
