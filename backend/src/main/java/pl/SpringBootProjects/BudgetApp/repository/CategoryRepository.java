package pl.SpringBootProjects.BudgetApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.SpringBootProjects.BudgetApp.entity.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.isDefault = :isDefault")
    List<Category> findByIsDefault(@Param("isDefault") boolean isDefault);
}
