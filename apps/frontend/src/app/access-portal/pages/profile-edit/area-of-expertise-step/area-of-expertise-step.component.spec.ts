import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfExpertiseEditStepComponent } from './area-of-expertise-step.component';

describe('AreaOfExpertiseEditStepComponent', () => {
  let component: AreaOfExpertiseEditStepComponent;
  let fixture: ComponentFixture<AreaOfExpertiseEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfExpertiseEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaOfExpertiseEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
