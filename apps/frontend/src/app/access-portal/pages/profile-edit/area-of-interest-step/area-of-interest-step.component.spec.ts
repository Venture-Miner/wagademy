import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfInterestEditStepComponent } from './area-of-interest-step.component';

describe('AreaOfInterestEditStepComponent', () => {
  let component: AreaOfInterestEditStepComponent;
  let fixture: ComponentFixture<AreaOfInterestEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfInterestEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaOfInterestEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
