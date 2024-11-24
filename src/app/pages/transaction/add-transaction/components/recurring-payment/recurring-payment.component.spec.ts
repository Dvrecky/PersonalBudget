import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentComponent } from './recurring-payment.component';

describe('RecurringPaymentComponent', () => {
  let component: RecurringPaymentComponent;
  let fixture: ComponentFixture<RecurringPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
