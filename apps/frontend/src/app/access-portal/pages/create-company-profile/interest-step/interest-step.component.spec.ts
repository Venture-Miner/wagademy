import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestStepComponent } from './interest-step.component';

describe('InterestStepComponent', () => {
  let component: InterestStepComponent;
  let fixture: ComponentFixture<InterestStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
