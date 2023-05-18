import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditStepComponent } from './profile-step.component';

describe('ProfileEditStepComponent', () => {
  let component: ProfileEditStepComponent;
  let fixture: ComponentFixture<ProfileEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
