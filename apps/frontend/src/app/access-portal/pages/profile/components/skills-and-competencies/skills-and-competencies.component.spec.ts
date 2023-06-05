import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsAndCompetenciesComponent } from './skills-and-competencies.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('SkillsAndCompetenciesComponent', () => {
  let component: SkillsAndCompetenciesComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsAndCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component skills and competencies', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "profile edit"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-profile-edit'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile/profile-edit');
  });
});
