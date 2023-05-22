import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationEditStepComponent } from './education-step.component';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';

describe('EducationEditStepComponent', () => {
  let component: EducationEditStepComponent;
  let fixture: ComponentFixture<EducationEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationEditStepComponent],
      imports: [ButtonPrimaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
