import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditStepComponent } from './profile-step.component';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../../shared/input/input.module';

describe('ProfileEditStepComponent', () => {
  let component: ProfileEditStepComponent;
  let fixture: ComponentFixture<ProfileEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditStepComponent],
      imports: [
        FormFieldModule,
        TextAreaModule,
        ButtonPrimaryModule,
        InputModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
