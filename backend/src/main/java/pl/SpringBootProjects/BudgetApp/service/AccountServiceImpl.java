package pl.SpringBootProjects.BudgetApp.service;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.SpringBootProjects.BudgetApp.entity.Account;
import pl.SpringBootProjects.BudgetApp.exception.AccountNotFoundException;
import pl.SpringBootProjects.BudgetApp.repository.AccountRepository;

import java.util.List;

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

}
