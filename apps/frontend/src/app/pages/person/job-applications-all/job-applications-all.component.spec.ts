import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobApplicationsAllComponent } from './job-applications-all.component';

describe('JobApplicationsAllComponent', () => {
  let component: JobApplicationsAllComponent;
  let fixture: ComponentFixture<JobApplicationsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationsAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
