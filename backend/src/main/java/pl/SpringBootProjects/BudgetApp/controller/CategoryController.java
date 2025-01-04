package pl.SpringBootProjects.BudgetApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.SpringBootProjects.BudgetApp.entity.Category;
import pl.SpringBootProjects.BudgetApp.service.CategoryServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.save(category);
        System.out.println(savedCategory);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }
}
