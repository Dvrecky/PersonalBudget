package pl.SpringBootProjects.BudgetApp.exception;

public class AccountNotFoundException extends RuntimeException{

    public AccountNotFoundException(String message) {
        super(message);
    }

}
