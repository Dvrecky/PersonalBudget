package pl.SpringBootProjects.BudgetApp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private double amount;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "description")
    private String description;

    @Column(name = "recurring")
    private boolean isRecurring;

    @Column(name = "recurring_period")
    private String recurringPeriod;

    @Column(name = "type")
    private String type;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "category_id")
    private Category category;


    public Transaction(double amount, LocalDateTime date, String description, boolean isRecurring, String recurringPeriod, String type, Account account, Category category) {
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.isRecurring = isRecurring;
        this.recurringPeriod = recurringPeriod;
        this.type = type;
        this.account = account;
        this.category = category;
    }
}