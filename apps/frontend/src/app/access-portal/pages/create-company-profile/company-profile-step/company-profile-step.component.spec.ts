import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyProfileStepComponent } from './company-profile-step.component';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { InputModule } from '../../../../shared/input/input.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CompanyProfileStepComponent', () => {
  let component: CompanyProfileStepComponent;
  let fixture: ComponentFixture<CompanyProfileStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileStepComponent],
      imports: [
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CompanyProfileStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      name: fb.control([]),
      areaOfExpertise: fb.control([]),
      description: fb.control([]),
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
