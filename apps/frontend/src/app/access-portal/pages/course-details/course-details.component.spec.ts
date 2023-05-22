import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailsComponent } from './course-details.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailsComponent],
      imports: [
        ButtonPrimaryModule,
        NavbarAuthenticatedModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
