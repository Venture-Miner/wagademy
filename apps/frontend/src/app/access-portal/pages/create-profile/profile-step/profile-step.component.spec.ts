import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStepComponent } from './profile-step.component';
import { InputModule } from 'apps/frontend/src/app/shared/input/input.module';
import { FormFieldModule } from 'apps/frontend/src/app/shared/form-field/form-field.module';
import { TextAreaModule } from 'apps/frontend/src/app/shared/text-area/text-area.module';

describe('ProfileStepComponent', () => {
  let component: ProfileStepComponent;
  let fixture: ComponentFixture<ProfileStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileStepComponent],
      imports: [InputModule, FormFieldModule, TextAreaModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
