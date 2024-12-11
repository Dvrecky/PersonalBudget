import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAnalysisComponent } from './financial-analysis.component';

describe('FinancialAnalysisComponent', () => {
  let component: FinancialAnalysisComponent;
  let fixture: ComponentFixture<FinancialAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
