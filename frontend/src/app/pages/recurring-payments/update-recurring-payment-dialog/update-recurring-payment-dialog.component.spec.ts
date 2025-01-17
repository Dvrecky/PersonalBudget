import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecurringPaymentDialogComponent } from './update-recurring-payment-dialog.component';

describe('UpdateRecurringPaymentDialogComponent', () => {
  let component: UpdateRecurringPaymentDialogComponent;
  let fixture: ComponentFixture<UpdateRecurringPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRecurringPaymentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRecurringPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
