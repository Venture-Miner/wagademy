import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAndCompetenciesEditStepComponent } from './skills-and-competencies-step.component';

describe('SkillsAndCompetenciesEditStepComponent', () => {
  let component: SkillsAndCompetenciesEditStepComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsAndCompetenciesEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
