import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import {
  AboutComponent,
  AreasOfExpertiseComponent,
  AreasOfInterestComponent,
  EducationComponent,
  ProfessionalExperienceComponent,
  SkillsAndCompetenciesComponent,
} from './components';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

jest.mock('ethers');

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        ProfessionalExperienceComponent,
        AreasOfExpertiseComponent,
        AreasOfInterestComponent,
        SkillsAndCompetenciesComponent,
        EducationComponent,
        AboutComponent,
      ],
      imports: [
        ButtonPrimaryModule,
        NavbarAuthenticatedModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component profile', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "home"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-home'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home');
  });
});
