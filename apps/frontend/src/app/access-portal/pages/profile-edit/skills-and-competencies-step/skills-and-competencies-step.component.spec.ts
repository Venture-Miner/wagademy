import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsAndCompetenciesEditStepComponent } from './skills-and-competencies-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../../shared/input/input.module';

describe('SkillsAndCompetenciesEditStepComponent', () => {
  let component: SkillsAndCompetenciesEditStepComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsAndCompetenciesEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
