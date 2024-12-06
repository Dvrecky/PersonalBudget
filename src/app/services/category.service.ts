import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: "Salary", type: "income", color: "#4CAF50" },
    { id: 2, name: "Freelancing", type: "income", color: "#2196F3" },
    { id: 3, name: "Investments", type: "income", color: "#FF9800" },
    { id: 4, name: "Gifts", type: "income", color: "#9C27B0" },
    { id: 5, name: "Rent", type: "expense", color: "#F44336" },
    { id: 6, name: "Groceries", type: "expense", color: "#FFC107" },
    { id: 7, name: "Transportation", type: "expense", color: "#3F51B5" },
    { id: 8, name: "Utilities", type: "expense", color: "#009688" },
    { id: 9, name: "Dining Out", type: "expense", color: "#FF5722" },
    { id: 10, name: "Health", type: "expense", color: "#E91E63" },
  ];
  

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoriesByTransactionId(value: number) {
    return this.categories.filter( (category) => category.id === value);
  }
}
