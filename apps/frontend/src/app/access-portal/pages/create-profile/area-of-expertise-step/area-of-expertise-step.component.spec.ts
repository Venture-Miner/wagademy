import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfExpertiseStepComponent } from './area-of-expertise-step.component';

describe('AreaOfExpertiseStepComponent', () => {
  let component: AreaOfExpertiseStepComponent;
  let fixture: ComponentFixture<AreaOfExpertiseStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfExpertiseStepComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfExpertiseStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
