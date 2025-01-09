import {Component, inject, OnInit} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryDialogComponent} from './add-category-dialog/add-category-dialog.component';
import {DeleteCategoryDialogComponent} from './delete-category-dialog/delete-category-dialog.component';
import {UpdateCategoryDialogComponent} from './update-category-dialog/update-category-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgClass} from '@angular/common';

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
    FormsModule,
    MatCard,
    MatCardContent,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  categoriesType: string;

  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService) {
    this.categoriesType = 'expense'
  }

  ngOnInit() {
   this.loadCategories();
  }

  openDeleteCategorynDialog(enterAnimationDuration: string, exitAnimationDuration: string, categoryId: number) {
    const categoryToDelete= this.categories.find(c => c.id === categoryId);
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      autoFocus: false,
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: categoryToDelete
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.loadCategories();
      }
    })
  }

  openUpdateCateogryDialog(enterAnimationDuration: string, exitAnimationDuration: string, categoryId: number) {
      const categoryToUpdate= this.categories.find(c => c.id === categoryId);
      const iconPaths = this.categories.map(c => c.iconPath)

      const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
        autoFocus: false,
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {categoryToUpdate, iconPaths}
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'update') {
          this.loadCategories();
        }
      })
  }

  openAddNewCategoryDialog(enterAnimationDuration: string, exitAnimationDuration: string, categoriesType: string) {
    console.log(categoriesType)
      const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
        autoFocus: false,
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: categoriesType
      })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added') {
        this.loadCategories();
      }
    })
  }

  private loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories
    });
  }
}
