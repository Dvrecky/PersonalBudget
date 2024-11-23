import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBudgetComponent } from './account-budget.component';

describe('AccountBudgetComponent', () => {
  let component: AccountBudgetComponent;
  let fixture: ComponentFixture<AccountBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
