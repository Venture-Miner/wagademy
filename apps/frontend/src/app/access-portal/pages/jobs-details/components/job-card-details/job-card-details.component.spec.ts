import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCardDetailsComponent } from './job-card-details.component';

describe('JobCardDetailsComponent', () => {
  let component: JobCardDetailsComponent;
  let fixture: ComponentFixture<JobCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardDetailsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(JobCardDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
