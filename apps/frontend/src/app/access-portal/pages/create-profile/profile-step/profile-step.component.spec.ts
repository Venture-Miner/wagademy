import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStepComponent } from './profile-step.component';
import { InputModule } from '../../../../shared/input/input.module';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';

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
