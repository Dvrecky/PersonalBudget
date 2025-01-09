package pl.SpringBootProjects.BudgetApp.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.entity.Transaction;
import pl.SpringBootProjects.BudgetApp.repository.CategoryRepository;
import pl.SpringBootProjects.BudgetApp.repository.TransactionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl {

    @Autowired
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, TransactionRepository transactionRepository) {
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(int categoryId) {
       return categoryRepository.findById(categoryId);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void delete(int id) {
        Optional<Category> categoryToDelete = categoryRepository.findById(id);

        if(categoryToDelete.isPresent()) {
            if(categoryToDelete.get().getIsDefault()) {
                throw new IllegalArgumentException("Default category cannot be deleted");
            }

            List<Category> defaultCategories = categoryRepository.findByIsDefault(true);
            Category defaultCategoryExpense = defaultCategories.stream()
                    .filter(c -> c.getType().equals("expense"))
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("Default expense category not found"));

            Category defaultCategoryIncome = defaultCategories.stream()
                    .filter(c -> c.getType().equals("income"))
                    .findFirst().orElseThrow(() -> new IllegalStateException("Default income category not found"));

            List<Transaction> transactions = transactionRepository.findByCategory(categoryToDelete.get());

            transactions.forEach(transaction -> {
                if(transaction.getType().equals("expense")) {
                    transaction.setCategory(defaultCategoryExpense);
                }
                if(transaction.getType().equals("income")) {
                    transaction.setCategory(defaultCategoryIncome);
                }

                transactionRepository.save(transaction);
            });

            categoryRepository.delete(categoryToDelete.get());
        }
        else {
            throw new EntityNotFoundException("Category with id " + id + " not found");
        }
    }

    public Category update(int id, Category categoryToUpdate) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));


        if(!category.getIsDefault()) {
            if (!categoryToUpdate.getName().equals(category.getName())) {
                category.setName(categoryToUpdate.getName());
            }
            if (!categoryToUpdate.getType().equals(category.getType())) {
                category.setType(categoryToUpdate.getType());
            }
            if (!categoryToUpdate.getColor().equals(category.getColor())) {
                category.setColor(categoryToUpdate.getColor());
            }
            if (!categoryToUpdate.getIconPath().equals(category.getIconPath())) {
                category.setIconPath(categoryToUpdate.getIconPath());
            }
            save(category);
            return category;
        }
        else {
            throw new IllegalArgumentException("Default category cannot be updated");
        }
    }
}
