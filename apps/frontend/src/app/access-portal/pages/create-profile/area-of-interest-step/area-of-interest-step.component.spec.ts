import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfInterestStepComponent } from './area-of-interest-step.component';
import { InputModule } from '../../../../shared/input/input.module';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AreaOfInterestStepComponent', () => {
  let component: AreaOfInterestStepComponent;
  let fixture: ComponentFixture<AreaOfInterestStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfInterestStepComponent],
      imports: [
        InputModule,
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfInterestStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      interest: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addArea() clicking the button', () => {
    component.mode = 'CREATE';
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

  it('should call removeArea(i)', () => {
    component.mode = 'CREATE';
    component.areasControl.setValue(['Area 1', 'Area 2', 'Area 3']);
    fixture.detectChanges();
    const removeArea = jest.spyOn(component, 'removeArea');
    const removeAreaButton = fixture.debugElement.query(By.css('#remove-area'));
    removeAreaButton.nativeElement.click();
    expect(removeArea).toHaveBeenCalledTimes(1);
  });
});
