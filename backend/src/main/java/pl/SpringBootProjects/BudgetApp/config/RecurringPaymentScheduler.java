package pl.SpringBootProjects.BudgetApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import pl.SpringBootProjects.BudgetApp.service.TransactionServiceImpl;

@Configuration
@EnableScheduling
public class RecurringPaymentScheduler {

    private final TransactionServiceImpl transactionService;

    public RecurringPaymentScheduler(TransactionServiceImpl transactionService) {
        this.transactionService = transactionService;
    }

    @Scheduled(cron = "0 0 0 * * * ")
    public void scheduleRecurringPayment() {
        transactionService.proccessRecurringPayment();
    }
}
