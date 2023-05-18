import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalExperienceEditStepComponent } from './professional-experience-step.component';

describe('ProfessionalExperienceEditStepComponent', () => {
  let component: ProfessionalExperienceEditStepComponent;
  let fixture: ComponentFixture<ProfessionalExperienceEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalExperienceEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
