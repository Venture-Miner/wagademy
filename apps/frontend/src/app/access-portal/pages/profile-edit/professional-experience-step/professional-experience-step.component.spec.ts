import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalExperienceEditStepComponent } from './professional-experience-step.component';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';

describe('ProfessionalExperienceEditStepComponent', () => {
  let component: ProfessionalExperienceEditStepComponent;
  let fixture: ComponentFixture<ProfessionalExperienceEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceEditStepComponent],
      imports: [ButtonPrimaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfessionalExperienceEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
