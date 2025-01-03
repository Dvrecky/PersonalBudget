import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransactionDialogComponent } from './delete-transaction-dialog.component';

describe('DeleteTransactionDialogComponent', () => {
  let component: DeleteTransactionDialogComponent;
  let fixture: ComponentFixture<DeleteTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTransactionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
