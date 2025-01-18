package pl.SpringBootProjects.BudgetApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.SpringBootProjects.BudgetApp.entity.Account;
import pl.SpringBootProjects.BudgetApp.service.AccountServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountServiceImpl accountService;

    @Autowired
    public AccountController(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAccounts() {
        List<Account> accounts = this.accountService.getAccounts();

        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        Account updatedAccount = accountService.updateAccount(account);

        return ResponseEntity.ok(updatedAccount);
    }

    @PostMapping
    public ResponseEntity<Account> addAccount(@RequestBody Account account) {

        Account newAccount = this.accountService.addAccount(account);

        return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Account> deleteAccount(@PathVariable("accountId") int id) {

        this.accountService.deleteAccount(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

