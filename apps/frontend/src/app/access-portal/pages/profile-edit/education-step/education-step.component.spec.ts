import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationEditStepComponent } from './education-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../shared/input/input.module';
import { ButtonSecondaryModule } from 'apps/frontend/src/app/shared/button-secondary/button-secondary.module';
import { FormFieldModule } from 'apps/frontend/src/app/shared/form-field/form-field.module';
import { TextAreaModule } from 'apps/frontend/src/app/shared/text-area/text-area.module';

describe('EducationEditStepComponent', () => {
  let component: EducationEditStepComponent;
  let fixture: ComponentFixture<EducationEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationEditStepComponent],
      imports: [
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ButtonSecondaryModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationEditStepComponent);
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
    const addEducation = jest.spyOn(component, 'addEducation');
    const addEducationButton = fixture.debugElement.query(
      By.css('#add-education')
    ).nativeElement;
    addEducationButton.click();
    expect(addEducation).toHaveBeenCalledTimes(1);
  });

  it('should call saveEdit.emit()', () => {
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#save-button')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });

  it('should call removeEducation(i)', () => {
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
