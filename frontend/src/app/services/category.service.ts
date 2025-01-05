import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import {HttpClient} from '@angular/common/http';
import {Observable, firstValueFrom} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = "http://localhost:8080/api/categories"

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  async getAllCategoriesAsync(): Promise<Category[]> {
    return firstValueFrom(this.http.get<Category[]>(this.apiUrl));
  }

  getCategoriesByType(type: string): Observable<Category[]> {
    return this.getAllCategories().pipe(
      map(categories => categories.filter(category => category.type === type))
    );
  }

  addCategory(category: Category) {
    return this.http.post(this.apiUrl, category);
  }

  delete(categoryId: number) {
    return this.http.delete(this.apiUrl + `/${categoryId}`);
  }
}
