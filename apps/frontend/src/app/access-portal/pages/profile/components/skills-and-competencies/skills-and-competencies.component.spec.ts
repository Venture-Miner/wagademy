import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsAndCompetenciesComponent } from './skills-and-competencies.component';

describe('SkillsAndCompetenciesComponent', () => {
  let component: SkillsAndCompetenciesComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsAndCompetenciesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
