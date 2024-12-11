import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchTransactionTypeComponent } from './switch-transaction-type.component';

describe('SwitchTransactionTypeComponent', () => {
  let component: SwitchTransactionTypeComponent;
  let fixture: ComponentFixture<SwitchTransactionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchTransactionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchTransactionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
