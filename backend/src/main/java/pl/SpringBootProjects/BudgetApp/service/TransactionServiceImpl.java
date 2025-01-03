package pl.SpringBootProjects.BudgetApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.dto.TransactionDto;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;
import pl.SpringBootProjects.BudgetApp.repository.TransactionRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl {

    @Autowired
    private final TransactionRepository transactionRepository;


    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }



    public List<TransactionDto> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();

        return transactions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TransactionDto> getTransactionsByAccountId(int id) {
        List<Transaction> transactions = transactionRepository.findByAccountId(id);

        return transactions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);}

    public void deleteTransaction(int transactoinId) {
        Transaction transaction = transactionRepository.findById(transactoinId).orElseThrow();
        transactionRepository.delete(transaction);
    }

    private TransactionDto convertToDto(Transaction transaction) {
        return new TransactionDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getDescription(),
                transaction.isRecurring(),
                transaction.getRecurringPeriod(),
                transaction.getType(),
                transaction.getAccount().getId(),
                transaction.getCategory().getId()
        );
    }
}
