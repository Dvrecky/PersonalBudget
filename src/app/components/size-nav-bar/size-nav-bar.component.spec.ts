import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeNavBarComponent } from './size-nav-bar.component';

describe('SizeNavBarComponent', () => {
  let component: SizeNavBarComponent;
  let fixture: ComponentFixture<SizeNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
