import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailsInfoComponent } from './course-details-info.component';
import {
  AboutCourseComponent,
  PersonalInfoComponent,
  RecommendationsComponent,
  TeacherEducationComponent,
  TeacherProfessionalExperienceComponent,
} from './components';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

jest.mock('ethers');

describe('CourseDetailsInfoComponent', () => {
  let component: CourseDetailsInfoComponent;
  let fixture: ComponentFixture<CourseDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseDetailsInfoComponent,
        TeacherProfessionalExperienceComponent,
        RecommendationsComponent,
        TeacherEducationComponent,
        AboutCourseComponent,
        PersonalInfoComponent,
      ],
      imports: [NavbarAuthenticatedModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CourseDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component course details info', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "course details"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-course'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/course-details');
  });
});
