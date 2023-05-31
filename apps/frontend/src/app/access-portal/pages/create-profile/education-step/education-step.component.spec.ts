import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationStepComponent } from './education-step.component';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { InputModule } from '../../../../shared/input/input.module';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('EducationStepComponent', () => {
  let component: EducationStepComponent;
  let fixture: ComponentFixture<EducationStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationStepComponent],
      imports: [
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ButtonSecondaryModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      academicEducation: fb.array([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addEducation() clicking the button', () => {
    component.mode = 'CREATE';
    const addEducation = jest.spyOn(component, 'addEducation');
    const addEducationButton = fixture.debugElement.query(
      By.css('#add-education')
    ).nativeElement;
    addEducationButton.click();
    expect(addEducation).toHaveBeenCalledTimes(1);
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

  it('should call previousStep.emit()', () => {
    component.mode = 'CREATE';
    fixture.detectChanges();
    const previousStep = jest.spyOn(component.previousStep, 'emit');
    const previousStepButton = fixture.debugElement.query(
      By.css('#previous-step')
    ).nativeElement;
    previousStepButton.click();
    expect(previousStep).toHaveBeenCalledTimes(1);
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

  it('should call saveEdit.emit()', () => {
    component.mode = 'EDIT';
    fixture.detectChanges();
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#next-or-save')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });

  it('should call removeEducation(i)', () => {
    component.mode = 'CREATE';
    component.academicEducation.push(
      fb.group({
        education: ['any_education'],
        course: ['any_course'],
        description: ['any_description'],
      })
    );
    fixture.detectChanges();
    const removeEducation = jest.spyOn(component, 'removeEducation');
    const removeEducationButton = fixture.debugElement.query(
      By.css('#remove-education')
    );
    removeEducationButton.nativeElement.click();
    expect(component.academicEducation.value).toEqual([]);
    expect(removeEducation).toHaveBeenCalledTimes(1);
  });
});
