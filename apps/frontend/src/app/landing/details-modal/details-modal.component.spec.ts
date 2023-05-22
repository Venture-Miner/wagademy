import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsModalComponent } from './details-modal.component';
import { BaseModalModule } from '../../shared/base-modal/base-modal.module';
import { AvatarsComponent } from './avatars';
import { PersonalInfoComponent } from './personal-info';
import { AboutComponent } from './about';
import { EducationComponent } from './education';
import { ProfessionalExperienceComponent } from './professional-experience';

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
      ],
      imports: [BaseModalModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component details modal', () => {
    expect(component).toBeTruthy();
  });
});
