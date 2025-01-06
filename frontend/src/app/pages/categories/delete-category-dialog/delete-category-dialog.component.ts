import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {CategoryService} from '../../../services/category.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-delete-category-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.css'
})
export class DeleteCategoryDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    private categoryService: CategoryService,
    ) {
  }

  deleteCategory(categoryId: number) {
    this.categoryService.delete(categoryId).subscribe( () => {
      this.dialogRef.close('delete');
    },
      (error: HttpErrorResponse) => {
        alert(error.message),
          this.dialogRef.close();
      });
  }
}
