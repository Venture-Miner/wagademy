import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalExperienceStepComponent } from './professional-experience-step.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { InputModule } from '../../../../shared/input/input.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { By } from '@angular/platform-browser';

describe('ProfessionalExperienceStepComponent', () => {
  let component: ProfessionalExperienceStepComponent;
  let fixture: ComponentFixture<ProfessionalExperienceStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceStepComponent],
      imports: [
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ButtonSecondaryModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfessionalExperienceStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      experience: fb.array([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addExperience() clicking the button', () => {
    component.mode = 'CREATE';
    const addExperience = jest.spyOn(component, 'addExperience');
    const addExperienceButton = fixture.debugElement.query(
      By.css('#add-experience')
    ).nativeElement;
    addExperienceButton.click();
    expect(addExperience).toHaveBeenCalledTimes(1);
  });

  it('should call removeExperience(i)', () => {
    component.mode = 'CREATE';
    component.experience.push(
      fb.group({
        company: ['any_company'],
        job: ['any_job'],
        description: ['any_description'],
      })
    );
    fixture.detectChanges();
    const removeExperience = jest.spyOn(component, 'removeExperience');
    const removeExperienceButton = fixture.debugElement.query(
      By.css('#remove-experience')
    );
    removeExperienceButton.nativeElement.click();
    expect(component.experience.value).toEqual([]);
    expect(removeExperience).toHaveBeenCalledTimes(1);
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
});
