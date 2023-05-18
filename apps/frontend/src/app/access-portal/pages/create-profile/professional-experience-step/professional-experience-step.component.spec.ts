import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalExperienceStepComponent } from './professional-experience-step.component';

describe('ProfessionalExperienceStepComponent', () => {
  let component: ProfessionalExperienceStepComponent;
  let fixture: ComponentFixture<ProfessionalExperienceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalExperienceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
