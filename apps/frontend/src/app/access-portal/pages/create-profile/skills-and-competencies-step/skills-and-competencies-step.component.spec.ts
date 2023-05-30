import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsAndCompetenciesStepComponent } from './skills-and-competencies-step.component';

describe('SkillsAndCompetenciesStepComponent', () => {
  let component: SkillsAndCompetenciesStepComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesStepComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsAndCompetenciesStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
