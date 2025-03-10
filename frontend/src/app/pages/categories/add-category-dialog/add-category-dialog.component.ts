import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectModule, MatSelectTrigger} from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
    MatSelectModule
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent implements OnInit {

  addCategoryForm!: FormGroup;
  dialogRef: any;
  iconPaths: string[] = [];
  selectedIconPath: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private categoryService: CategoryService
  )
  {
    this.dialogRef = dialogRef;
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-z0-9 ]+$')]],
      type: [this.data, Validators.required],
      color: ['', Validators.required],
      iconPath: ['', Validators.required]
    }
  );
    this.selectedIconPath = this.addCategoryForm.get('iconPath')?.value || '';

    this.iconPaths = [
      '/icons/categories/others.png',
      '/icons/categories/clothes.png',
      '/icons/categories/coffee.png',
      '/icons/categories/education.png',
      '/icons/categories/family.png',
      '/icons/categories/finance.png',
      '/icons/categories/gift-box.png',
      '/icons/categories/groceries.png',
      '/icons/categories/health.png',
      '/icons/categories/hobby.png',
      '/icons/categories/restaurant.png',
      '/icons/categories/transport.png',
      '/icons/categories/vacation.png',
      '/icons/categories/utilities.png',
      '/icons/categories/saving.png',
      '/icons/categories/subscribe.png',
      '/icons/categories/pet.png',
      '/icons/categories/fast-food.png',
      '/icons/categories/car.png',
      '/icons/categories/book.png',
      '/icons/categories/beauty.png',
    ];
  }

  ngOnInit() {
    this.addCategoryForm.get('iconPath')?.valueChanges.subscribe(value => {
      this.selectedIconPath = value;
    });
  }

  onAddCategoryConfirm() {
    if(this.addCategoryForm.valid) {
      this.categoryService.addCategory(this.addCategoryForm.value).subscribe(() => {

        this.addCategoryForm.reset({
          name: '',
          type: [''],
          color: [''],
          iconPath: [''],
        })

          this.dialogRef.close('added')
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
