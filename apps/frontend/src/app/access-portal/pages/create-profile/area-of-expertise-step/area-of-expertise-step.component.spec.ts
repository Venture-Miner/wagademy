import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfExpertiseStepComponent } from './area-of-expertise-step.component';
import { InputModule } from '../../../../shared/input/input.module';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AreaOfExpertiseStepComponent', () => {
  let component: AreaOfExpertiseStepComponent;
  let fixture: ComponentFixture<AreaOfExpertiseStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfExpertiseStepComponent],
      imports: [
        InputModule,
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfExpertiseStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      expertise: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addArea() clicking the button', () => {
    const addArea = jest.spyOn(component, 'addArea');
    const addAreaButton = fixture.debugElement.query(
      By.css('#add-area')
    ).nativeElement;
    addAreaButton.click();
    expect(addArea).toHaveBeenCalledTimes(1);
  });

  it('should call addArea() when press enter in input', () => {
    const addArea = jest.spyOn(component, 'addArea');
    const addAreaInput = fixture.debugElement.query(
      By.css('#add-area-input')
    ).nativeElement;
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    addAreaInput.dispatchEvent(event);
    expect(addArea).toHaveBeenCalledTimes(1);
  });

  it('should call previousStep.emit()', async () => {
    component.mode = 'CREATE';
    fixture.detectChanges();
    await fixture.whenStable();
    const previousStep = jest.spyOn(component.previousStep, 'emit');
    const previousStepButton = fixture.debugElement.query(
      By.css('#previous-step')
    ).nativeElement;
    previousStepButton.click();
    expect(previousStep).toHaveBeenCalledTimes(1);
  });

  it('should call nextStep.emit()', async () => {
    component.mode = 'CREATE';
    fixture.detectChanges();
    await fixture.whenStable();
    const nextStep = jest.spyOn(component.nextStep, 'emit');
    const nextStepButton = fixture.debugElement.query(
      By.css('#next-or-save')
    ).nativeElement;
    nextStepButton.click();
    expect(nextStep).toHaveBeenCalledTimes(1);
  });

  it('should call saveEdit.emit()', async () => {
    component.mode = 'EDIT';
    fixture.detectChanges();
    await fixture.whenStable();
    const saveEdit = jest.spyOn(component.saveEdit, 'emit');
    const saveEditButton = fixture.debugElement.query(
      By.css('#next-or-save')
    ).nativeElement;
    saveEditButton.click();
    expect(saveEdit).toHaveBeenCalledTimes(1);
  });
});
