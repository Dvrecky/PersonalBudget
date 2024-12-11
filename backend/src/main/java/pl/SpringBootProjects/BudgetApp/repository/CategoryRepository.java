package pl.SpringBootProjects.BudgetApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.SpringBootProjects.BudgetApp.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
