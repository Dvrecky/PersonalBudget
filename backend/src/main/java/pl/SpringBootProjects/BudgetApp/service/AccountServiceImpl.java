package pl.SpringBootProjects.BudgetApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.entity.Account;
import pl.SpringBootProjects.BudgetApp.exception.AccountNotFoundException;
import pl.SpringBootProjects.BudgetApp.repository.AccountRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccounts() {
        return this.accountRepository.findAll();
    }

    public Account addAccount(Account account) {
        return this.accountRepository.save(account);
    }

    public void deleteAccount(int id) {
        Account account = this.accountRepository.findById(id)
                                                    .orElseThrow( () -> new AccountNotFoundException("User with id: " + id + " noy found") );

        this.accountRepository.delete(account);
    }


    public Optional<Account> getAccountById(int accountId) {
        return accountRepository.findById(accountId);
    }
}
