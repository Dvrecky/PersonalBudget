package pl.SpringBootProjects.BudgetApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.SpringBootProjects.BudgetApp.dto.TransactionDto;
import pl.SpringBootProjects.BudgetApp.entity.Account;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;
import pl.SpringBootProjects.BudgetApp.service.AccountServiceImpl;
import pl.SpringBootProjects.BudgetApp.service.CategoryServiceImpl;
import pl.SpringBootProjects.BudgetApp.service.TransactionServiceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private final TransactionServiceImpl transactionService;
    private final AccountServiceImpl accountServiceImpl;
    private final CategoryServiceImpl categoryServiceImpl;

    public TransactionController(TransactionServiceImpl transactionService, AccountServiceImpl accountServiceImpl, CategoryServiceImpl categoryServiceImpl) {
        this.transactionService = transactionService;
        this.accountServiceImpl = accountServiceImpl;
        this.categoryServiceImpl = categoryServiceImpl;
    }

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getTransactions() {
        List<TransactionDto> transactions = transactionService.getAllTransactions();

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<TransactionDto>> getTransactionsByAccount(@PathVariable int id) {
        List<TransactionDto> transactions = transactionService.getTransactionsByAccountId(id);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionDto transactionDto) {
        System.out.println(transactionDto.toString());


        Optional<Account> account = accountServiceImpl.getAccountById(transactionDto.getAccountId());
        Optional<Category> category = categoryServiceImpl.getCategoryById(transactionDto.getCategoryId());


        Transaction transaction = new Transaction();
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDate(transactionDto.getDate());
        transaction.setCategory(category.orElse(null));
        transaction.setAccount(account.orElse(null));
        transaction.setDescription(transactionDto.getDescription());
        transaction.setRecurring(transactionDto.isRecurring());
        transaction.setRecurringPeriod(transactionDto.getRecurringPeriod());
        transaction.setType(transactionDto.getType());

        transactionService.addTransaction(transaction);
        return new ResponseEntity<>(transactionDto, HttpStatus.CREATED);
    }

}
