import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationEditStepComponent } from './education-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../shared/input/input.module';

describe('EducationEditStepComponent', () => {
  let component: EducationEditStepComponent;
  let fixture: ComponentFixture<EducationEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationEditStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      academicEducation: fb.array([]),
    });
    fixture.detectChanges();
  });

  it('should create the component education step', () => {
    expect(component).toBeTruthy();
  });

  it('should call addEducation()', () => {
    const addEducation = jest.spyOn(component, 'addEducation');
    const addEducationButton = fixture.debugElement.query(
      By.css('#add-education')
    );
    addEducationButton.nativeElement.click();
    expect(addEducation).toHaveBeenCalledTimes(1);
  });

  // it('should call removeEducation()', () => {
  //   component.academicEducation.setValue([
  //     { education: ['Area 1'], course: ['Area 2'], description: ['Area 3'] },
  //   ]);
  //   fixture.detectChanges();
  //   const removeEducation = jest.spyOn(component, 'removeEducation');
  //   const removeEducationButton = fixture.debugElement.query(
  //     By.css('#remove-education')
  //   ).nativeElement;
  //   removeEducationButton.click();
  //   expect(removeEducation).toHaveBeenCalledTimes(1);
  // });

  it('should call saveEdit.emit()', () => {
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#save-button')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });
});
