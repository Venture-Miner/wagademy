import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationEditStepComponent } from './education-step.component';

describe('EducationEditStepComponent', () => {
  let component: EducationEditStepComponent;
  let fixture: ComponentFixture<EducationEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
