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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
