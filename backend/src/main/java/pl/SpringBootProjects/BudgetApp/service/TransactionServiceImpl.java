package pl.SpringBootProjects.BudgetApp.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.dto.TransactionDto;
import pl.SpringBootProjects.BudgetApp.entity.Account;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;
import pl.SpringBootProjects.BudgetApp.repository.TransactionRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl {

    private final TransactionRepository transactionRepository;
    private final CategoryServiceImpl categoryService;
    private final AccountServiceImpl accountService;

    public TransactionServiceImpl(TransactionRepository transactionRepository, CategoryServiceImpl categoryService, AccountServiceImpl accountService) {
        this.transactionRepository = transactionRepository;

        this.categoryService = categoryService;
        this.accountService = accountService;
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


    public TransactionDto addTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
        return convertToDto(transaction);
    }

    public void deleteTransaction(int transactoinId) {
        Transaction transaction = transactionRepository.findById(transactoinId)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id " + transactoinId));

        transactionRepository.delete(transaction);
    }

    public TransactionDto updateTransaction(int transactoinId, TransactionDto transactionToUpdate) {
        Transaction transaction = transactionRepository.findById(transactoinId)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id " + transactoinId));


            if(!transactionToUpdate.getType().equals(transaction.getType())) {
                transaction.setType(transactionToUpdate.getType());
            }
            if(!Objects.equals(transactionToUpdate.getDescription(), transaction.getDescription())) {
                transaction.setDescription(transactionToUpdate.getDescription());
            }
            if(transactionToUpdate.getAmount() != transaction.getAmount()) {
                transaction.setAmount(transactionToUpdate.getAmount());
            }
            if(transactionToUpdate.getCategoryId() != transaction.getCategory().getId()) {
                Category category = categoryService.getCategoryById(transactionToUpdate.getCategoryId()).
                        orElseThrow(() -> new EntityNotFoundException("Category not found with id " + transactionToUpdate.getCategoryId()));

                transaction.setCategory(category);
            }
            if(transactionToUpdate.getAccountId() != transaction.getAccount().getId()) {
                Account account = accountService.getAccountById(transactionToUpdate.getAccountId()).
                        orElseThrow(() -> new EntityNotFoundException("Account not found with id " + transactionToUpdate.getAccountId()));

                transaction.setAccount(account);
            }
            if(!Objects.equals(transactionToUpdate.getDate(), transaction.getDate())) {
                transaction.setDate(transactionToUpdate.getDate());
            }

            if(!Objects.equals(transactionToUpdate.isRecurring(), transaction.isRecurring())) {
                transaction.setRecurring(transactionToUpdate.isRecurring());
            }
            if(!Objects.equals(transactionToUpdate.getRecurringPeriod(), transaction.getRecurringPeriod())) {
                transaction.setRecurringPeriod(transactionToUpdate.getRecurringPeriod());
            }

            addTransaction(transaction);
            return convertToDto(transaction);
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

    public Transaction convertToEntity(TransactionDto transactionDto) {
        Optional<Account> account = accountService.getAccountById(transactionDto.getAccountId());
        Optional<Category> category = categoryService.getCategoryById(transactionDto.getCategoryId());

        return new Transaction(
                transactionDto.getAmount(),
                transactionDto.getDate(),
                transactionDto.getDescription(),
                transactionDto.isRecurring(),
                transactionDto.getRecurringPeriod(),
                transactionDto.getType(),
                account.get(),
                category.get()
        );
    }

    @Transactional
    public void proccessRecurringPayment() {
        List<Transaction> transactions = transactionRepository.findRecurringTransactionToProcess();
        LocalDate now = LocalDate.now();

        if(!transactions.isEmpty()) {
            for(Transaction transaction : transactions) {
                LocalDateTime recurringDate;

                if(transaction.getLastProcessedDate() == null) {
                    recurringDate = transaction.getDate();
                } else {
                    recurringDate = transaction.getLastProcessedDate();
                }


                if(transaction.getRecurringPeriod().equalsIgnoreCase("weekly")) {
                    recurringDate = recurringDate.plusWeeks(1);
                }
                else if (transaction.getRecurringPeriod().equalsIgnoreCase("monthly")) {
                    recurringDate = recurringDate.plusMonths(1);
                }
                else if (transaction.getRecurringPeriod().equalsIgnoreCase("annually")) {
                    recurringDate = recurringDate.plusYears(1);
                }

                if(recurringDate.toLocalDate().equals(now)) {

                    Transaction newTransaction = new Transaction();
                    newTransaction.setAccount(transaction.getAccount());
                    newTransaction.setType(transaction.getType());
                    newTransaction.setAmount(transaction.getAmount());
                    newTransaction.setDescription(transaction.getDescription());
                    newTransaction.setRecurring(false);
                    newTransaction.setRecurringPeriod(null);
                    newTransaction.setCategory(transaction.getCategory());
                    newTransaction.setDate(recurringDate);

                    transactionRepository.save(newTransaction);

                    transaction.setLastProcessedDate(recurringDate);
                    transactionRepository.save(transaction);
                }
            }
        }
    }
}
