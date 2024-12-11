package pl.SpringBootProjects.BudgetApp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TransactionDto {

    private double amount;
    private LocalDateTime date;
    private String description;
    private boolean isRecurring;
    private String recurringPeriod;
    private String type;
    private int accountId;
    private int categoryId;
}
