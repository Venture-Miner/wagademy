import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card';
import { FooterComponent } from './footer';
import { NavbarLandingComponent } from './navbar-landing';
import { ResumesTogglerComponent } from './resumes-toggler';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        CardComponent,
        NavbarLandingComponent,
        FooterComponent,
        ResumesTogglerComponent,
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component landing', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "account type"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#account-type'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/account-type');
  });

  it('should display a list of student', () => {
    component.selectedBlock = 'STUDENTS';
    fixture.detectChanges();
    const studentList = fixture.debugElement.queryAll(By.css('#student-list'));
    expect(studentList.length).toBe(4);
  });

  it('should display a list of team', () => {
    component.selectedBlock = 'SQUADS';
    fixture.detectChanges();
    const teamList = fixture.debugElement.queryAll(By.css('#team-list'));
    expect(teamList.length).toBe(1);
  });

  it('should display a list of teacher', () => {
    const teacherList = fixture.debugElement.queryAll(By.css('#teacher-list'));
    expect(teacherList.length).toBe(1);
  });
});
