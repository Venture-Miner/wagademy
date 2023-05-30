import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsDetailsComponent } from './jobs-details.component';
import { JobCardDetailsComponent } from './components/job-card-details';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('JobsDetailsComponent', () => {
  let component: JobsDetailsComponent;
  let fixture: ComponentFixture<JobsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonSecondaryModule,
        ButtonPrimaryModule,
        RouterTestingModule,
        NavbarAuthenticatedModule,
      ],
      declarations: [JobsDetailsComponent, JobCardDetailsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(JobsDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
