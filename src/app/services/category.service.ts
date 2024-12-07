import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: "Salary", type: "income", color: "#4CAF50", iconPath: "/icons/categories/finance.png"},
    { id: 2, name: "Home", type: "income", color: "#2196F3", iconPath: "/icons/categories/home.png"},
    { id: 3, name: "Family", type: "income", color: "#FF9800", iconPath: "/icons/categories/family.png" },
    { id: 4, name: "Gifts", type: "income", color: "#9C27B0", iconPath: "/icons/categories/gift-box.png" },
    { id: 5, name: "Vacation", type: "expense", color: "#F44336", iconPath: "/icons/categories/vacation.png" },
    { id: 6, name: "Groceries", type: "expense", color: "#FFC107", iconPath: "/icons/categories/groceries.png" },
    { id: 7, name: "Transport", type: "expense", color: "#3F51B5", iconPath: "/icons/categories/transport.png" },
    { id: 8, name: "Others", type: "expense", color: "#009688", iconPath: "/icons/categories/others.png" },
    { id: 9, name: "Dining Out", type: "expense", color: "#FF5722", iconPath: "/icons/categories/restaurant.png" },
    { id: 10, name: "Health", type: "expense", color: "#E91E63", iconPath: "/icons/categories/health.png" },
    { id: 11, name: "Hobby", type: "expense", color: "#1ee9af", iconPath: "/icons/categories/hobby.png" },
    { id: 12, name: "Education", type: "expense", color: "#E91E63", iconPath: "/icons/categories/education.png" }
  ];


  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoriesByTransactionId(value: number) {
    return this.categories.filter( (category) => category.id === value);
  }
}
