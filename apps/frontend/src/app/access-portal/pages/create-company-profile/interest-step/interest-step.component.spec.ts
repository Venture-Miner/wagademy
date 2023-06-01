import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestStepComponent } from './interest-step.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../shared/input/input.module';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { By } from '@angular/platform-browser';

describe('InterestStepComponent', () => {
  let component: InterestStepComponent;
  let fixture: ComponentFixture<InterestStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestStepComponent],
      imports: [
        InputModule,
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(InterestStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      interests: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addInterest() clicking the button', () => {
    component.mode = 'CREATE';
    const addInterest = jest.spyOn(component, 'addInterest');
    const addInterestButton = fixture.debugElement.query(
      By.css('#add-interest')
    ).nativeElement;
    addInterestButton.click();
    expect(addInterest).toHaveBeenCalledTimes(1);
  });

  it('should call addInterest() when press enter in input', () => {
    const addInterest = jest.spyOn(component, 'addInterest');
    const addInterestInput = fixture.debugElement.query(
      By.css('#add-interest-input')
    ).nativeElement;
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    addInterestInput.dispatchEvent(event);
    expect(addInterest).toHaveBeenCalledTimes(1);
  });

  it('should call removeInterest(i)', () => {
    component.mode = 'CREATE';
    component.interestsControl.setValue([
      'Interest 1',
      'Interest 2',
      'Interest 3',
    ]);
    fixture.detectChanges();
    const removeInterest = jest.spyOn(component, 'removeInterest');
    const removeInterestButton = fixture.debugElement.query(
      By.css('#remove-interest')
    );
    removeInterestButton.nativeElement.click();
    expect(removeInterest).toHaveBeenCalledTimes(1);
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
});
