import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalExperienceEditStepComponent } from './professional-experience-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../shared/input/input.module';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';

describe('ProfessionalExperienceEditStepComponent', () => {
  let component: ProfessionalExperienceEditStepComponent;
  let fixture: ComponentFixture<ProfessionalExperienceEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceEditStepComponent],
      imports: [
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfessionalExperienceEditStepComponent);
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
    const addExperience = jest.spyOn(component, 'addExperience');
    const addExperienceButton = fixture.debugElement.query(
      By.css('#add-experience')
    ).nativeElement;
    addExperienceButton.click();
    expect(addExperience).toHaveBeenCalledTimes(1);
  });

  it('should call removeExperience(i)', () => {
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

  it('should call saveEdit.emit()', () => {
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#save-button')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });
});
