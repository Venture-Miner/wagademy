import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsModalComponent } from './details-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseModalModule } from '../../shared/base-modal/base-modal.module';
import { AboutComponent } from './about';
import { AreasOfExpertiseComponent } from './areas-of-expertise';
import { AreasOfInterestComponent } from './areas-of-interest';
import { AvatarsComponent } from './avatars';
import { EducationComponent } from './education';
import { PersonalInfoComponent } from './personal-info';
import { ProfessionalExperienceComponent } from './professional-experience';
import { RecommendationsComponent } from './recommendations';
import { SkillsAndCompetenciesComponent } from './skills-and-competencies';
import { SquadBannerComponent } from './squad-banner';

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DetailsModalComponent,
        AvatarsComponent,
        PersonalInfoComponent,
        AboutComponent,
        EducationComponent,
        ProfessionalExperienceComponent,
        AreasOfExpertiseComponent,
        AreasOfInterestComponent,
        SkillsAndCompetenciesComponent,
        SquadBannerComponent,
        RecommendationsComponent,
      ],
      imports: [BaseModalModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component details modal', () => {
    expect(component).toBeTruthy();
  });
});
