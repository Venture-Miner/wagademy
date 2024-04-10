import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewGptComponent } from './interview-gpt.component';

describe('InterviewGptComponent', () => {
  let component: InterviewGptComponent;
  let fixture: ComponentFixture<InterviewGptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewGptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewGptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
