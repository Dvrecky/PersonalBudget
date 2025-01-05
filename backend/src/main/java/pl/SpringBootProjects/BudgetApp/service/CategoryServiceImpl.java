package pl.SpringBootProjects.BudgetApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl {

    @Autowired
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
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
        categoryRepository.deleteById(id);
    }

    public Category update(int id, Category categoryToUpdate) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));


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
}
