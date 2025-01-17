import {Component, Inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatButton, MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-update-category-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
  ],
  templateUrl: './update-category-dialog.component.html',
  styleUrl: './update-category-dialog.component.css'
})
export class UpdateCategoryDialogComponent implements OnInit {
  selectedIconPath: string = '';
  updateCategoryForm!: FormGroup;
  category!: Category;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<UpdateCategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService
    )
  {

    this.category = data.categoryToUpdate;

   this.updateCategoryForm = this.fb.group({
     name: [this.category.name, [Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-z0-9 ]+$')]],
     type: [this.category.type],
     color: [this.category.color],
     iconPath: [this.category.iconPath],
   })

    this.selectedIconPath = this.updateCategoryForm.get('iconPath')?.value || '';
  }

  ngOnInit() {
    this.updateCategoryForm.get('iconPath')?.valueChanges.subscribe(value => {
      this.selectedIconPath = value;
    });
  }


  onCategoryUpdateConfirm() {
    if(this.updateCategoryForm.valid) {
      const updatedCategory = this.updateCategoryForm.value;
      this.categoryService.update(this.category.id, updatedCategory).subscribe(() => {
        this.dialogRef.close('update');
      },

      (error: HttpErrorResponse) => {
        alert(error.message),
          this.dialogRef.close();
      }
      )
    }
    else {
      console.error("Invalid form")
    }
  }
}
