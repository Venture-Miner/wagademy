import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsJobComponent } from './applications-job.component';

describe('ApplicationsJobComponent', () => {
  let component: ApplicationsJobComponent;
  let fixture: ComponentFixture<ApplicationsJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsJobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
