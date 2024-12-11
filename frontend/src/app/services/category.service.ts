import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = "http://localhost:8080/api/categories"

  constructor(private http: HttpClient) {}
  // private categories: Category[] = [
  //   { id: 1, name: "Salary", type: "income", color: "#ace8ae", iconPath: "/icons/categories/finance.png"},
  //   { id: 2, name: "Home", type: "income", color: "#82c7ff", iconPath: "/icons/categories/home.png"},
  //   { id: 3, name: "Family", type: "income", color: "#fdcc7f", iconPath: "/icons/categories/family.png" },
  //   { id: 4, name: "Gifts", type: "income", color: "#e271f4", iconPath: "/icons/categories/gift-box.png" },
  //   { id: 5, name: "Vacation", type: "expense", color: "#f66c62", iconPath: "/icons/categories/vacation.png" },
  //   { id: 6, name: "Groceries", type: "expense", color: "#efe0b0", iconPath: "/icons/categories/groceries.png" },
  //   { id: 7, name: "Transport", type: "expense", color: "#49569f", iconPath: "/icons/categories/transport.png" },
  //   { id: 8, name: "Others", type: "expense", color: "#73dad0", iconPath: "/icons/categories/others.png" },
  //   { id: 9, name: "Dining Out", type: "expense", color: "#df6942", iconPath: "/icons/categories/restaurant.png" },
  //   { id: 10, name: "Health", type: "expense", color: "#ed3f7a", iconPath: "/icons/categories/health.png" },
  //   { id: 11, name: "Hobby", type: "expense", color: "#76efcc", iconPath: "/icons/categories/hobby.png" },
  //   { id: 12, name: "Education", type: "expense", color: "#b63f66", iconPath: "/icons/categories/education.png" }
  // ];

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  
  getCategoriesByType(type: string): Observable<Category[]> {
    return this.getAllCategories().pipe(
      map(categories => categories.filter(category => category.type === type))
    );
  }
  
  
  // getCategoriesByTransactionId(value: number) {
  //   return this.categories.filter( (category) => category.id === value);
  // }
}
