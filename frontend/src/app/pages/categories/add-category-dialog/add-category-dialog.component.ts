import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {

  addCategoryForm!: FormGroup;
  dialogRef: any;

  constructor(
    private fb: FormBuilder,
    dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private categoryService: CategoryService
  )
  {
    this.dialogRef = dialogRef;
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      color: ['', Validators.required],
      iconPath: ['/icons/categories/others.png']
    })
  }

  onAddCategoryConfirm() {

    if(this.addCategoryForm.valid) {
      console.log(this.addCategoryForm.value);

      this.categoryService.addCategory(this.addCategoryForm.value).subscribe(() => {

        this.addCategoryForm.reset({
          name: '',
          type: [''],
          color: [''],
          iconPath: ['/icons/categories/others.png'],
        })
        },

        (error) =>{
          console.error('Error creating category:', error);
        }
      )
    }
    else {
      console.log('Form is invalid');
    }
  }
}
