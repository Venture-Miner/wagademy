import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStepComponent } from './profile-step.component';
import { InputModule } from '../../../../shared/input/input.module';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';

describe('ProfileStepComponent', () => {
  let component: ProfileStepComponent;
  let fixture: ComponentFixture<ProfileStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileStepComponent],
      imports: [
        InputModule,
        FormFieldModule,
        TextAreaModule,
        ReactiveFormsModule,
        ButtonPrimaryModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileStepComponent);
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

  it('should call edit.emit()', () => {
    component.mode = 'VIEW';
    fixture.detectChanges();
    const edit = jest.spyOn(component.edit, 'emit');
    const editButton = fixture.debugElement.query(
      By.css('#edit')
    ).nativeElement;
    editButton.click();
    expect(edit).toHaveBeenCalledTimes(1);
  });

  it('should call nextStep.emit()', () => {
    component.mode = 'CREATE';
    fixture.detectChanges();
    const nextStep = jest.spyOn(component.nextStep, 'emit');
    const nextStepButton = fixture.debugElement.query(
      By.css('#next-or-save')
    ).nativeElement;
    nextStepButton.click();
    expect(nextStep).toHaveBeenCalledTimes(1);
  });
});
