import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfInterestStepComponent } from './area-of-interest-step.component';

describe('AreaOfInterestStepComponent', () => {
  let component: AreaOfInterestStepComponent;
  let fixture: ComponentFixture<AreaOfInterestStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaOfInterestStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaOfInterestStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
