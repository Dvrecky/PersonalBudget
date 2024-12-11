package pl.SpringBootProjects.BudgetApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;
import pl.SpringBootProjects.BudgetApp.repository.TransactionRepository;

import java.util.List;

@Service
public class TransactionServiceImpl {

    @Autowired
    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByAccountId(int id) {
        return transactionRepository.findByAccountId(id);
    }

    public Transaction addTransaction(Transaction transaction) { return transactionRepository.save(transaction);}

    public void deleteTransaction(Transaction transaction) {
        transactionRepository.delete(transaction);
    }
}
