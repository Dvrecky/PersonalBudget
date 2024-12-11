package pl.SpringBootProjects.BudgetApp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class TransactionDto {

    private double amount;
    private LocalDateTime date;
    private String description;
    private boolean isRecurring;
    private String recurringPeriod;
    private String type;
    private int accountId;
    private int categoryId;

    public Boolean isIsRecurring() {
        return isRecurring;
    }
}