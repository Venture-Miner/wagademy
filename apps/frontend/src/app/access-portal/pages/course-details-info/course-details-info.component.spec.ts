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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
