package pl.SpringBootProjects.BudgetApp.config;


import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.repository.CategoryRepository;

@Component
public class DefaultCategoryInitializer {

    private final CategoryRepository categoryRepository;

    @Autowired
    public DefaultCategoryInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    public void init() {

        if(categoryRepository.findByIsDefault(true).isEmpty()) {
            Category categoryExpsense = new Category();
            categoryExpsense.setName("Others");
            categoryExpsense.setType("expense");
            categoryExpsense.setColor("red");
            categoryExpsense.setIconPath("/icons/categories/others.png");
            categoryExpsense.setIsDefault(true);
            categoryRepository.save(categoryExpsense);

            Category categoryIncome = new Category();
            categoryIncome.setName("Others");
            categoryIncome.setType("income");
            categoryIncome.setColor("blue");
            categoryIncome.setIconPath("/icons/categories/others.png");
            categoryIncome.setIsDefault(true);
            categoryRepository.save(categoryIncome);
        }
    }
}
