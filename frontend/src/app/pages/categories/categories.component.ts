import {Component, inject, OnInit} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryDialogComponent} from './add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatListModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatFabButton,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];

  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories
    });
  }

  openDeleteCategorynDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {

  }

  openUpdateCateogryDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {

  }

  openAddNewCategoryDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
      this.dialog.open(AddCategoryDialogComponent, {
        autoFocus: false,
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
  }
}
