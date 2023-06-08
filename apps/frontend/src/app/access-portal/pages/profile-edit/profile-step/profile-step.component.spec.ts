import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditStepComponent } from './profile-step.component';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { InputModule } from '../../../../shared/input/input.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';

describe('ProfileEditStepComponent', () => {
  let component: ProfileEditStepComponent;
  let fixture: ComponentFixture<ProfileEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditStepComponent],
      imports: [
        InputModule,
        FormFieldModule,
        TextAreaModule,
        ReactiveFormsModule,
        ButtonPrimaryModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileEditStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      name: fb.control([]),
      email: fb.control([]),
      dateOfBirth: fb.control([]),
      cellphone: fb.control([]),
      country: fb.control([]),
      state: fb.control([]),
      about: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveEdit.emit()', () => {
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#save-button')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });
});
