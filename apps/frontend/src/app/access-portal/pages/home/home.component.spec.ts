import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CourseCardComponent, PostCardComponent } from './components';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { WidgetModule } from '../../../shared/widget/widget.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CourseCardComponent, PostCardComponent],
      imports: [
        InputSelectModule,
        InputModule,
        NavbarAuthenticatedModule,
        RouterTestingModule,
        WidgetModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component home', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "course details"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-course-details'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/course-details');
  });

  it('should redirect to "jobs details"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-jobs-details'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/jobs-details');
  });
});
