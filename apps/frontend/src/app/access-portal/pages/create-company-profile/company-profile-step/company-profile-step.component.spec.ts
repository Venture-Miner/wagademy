import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileStepComponent } from './company-profile-step.component';

describe('CompanyProfileStepComponent', () => {
  let component: CompanyProfileStepComponent;
  let fixture: ComponentFixture<CompanyProfileStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyProfileStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
