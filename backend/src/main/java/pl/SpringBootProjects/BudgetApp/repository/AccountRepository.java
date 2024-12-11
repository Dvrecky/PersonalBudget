package pl.SpringBootProjects.BudgetApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.SpringBootProjects.BudgetApp.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
