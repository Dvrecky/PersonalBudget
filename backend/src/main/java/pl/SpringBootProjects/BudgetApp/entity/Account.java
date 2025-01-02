package pl.SpringBootProjects.BudgetApp.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "balance")
    private double balance;

    public Account(String name, double balance) {
        this.name = name;
        this.balance = balance;
    }

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//    private List<Transaction> transactionList;
}