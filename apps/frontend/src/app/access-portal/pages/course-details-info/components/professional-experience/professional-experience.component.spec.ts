import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherProfessionalExperienceComponent } from './professional-experience.component';

describe('TeacherProfessionalExperienceComponent', () => {
  let component: TeacherProfessionalExperienceComponent;
  let fixture: ComponentFixture<TeacherProfessionalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherProfessionalExperienceComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TeacherProfessionalExperienceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
