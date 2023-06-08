import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfExpertiseEditStepComponent } from './area-of-expertise-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../../shared/input/input.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AreaOfExpertiseEditStepComponent', () => {
  let component: AreaOfExpertiseEditStepComponent;
  let fixture: ComponentFixture<AreaOfExpertiseEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfExpertiseEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfExpertiseEditStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      expertise: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create the component areas of expertise step', () => {
    expect(component).toBeTruthy();
  });

  it('should call addArea()', () => {
    const addArea = jest.spyOn(component, 'addArea');
    const addAreaButton = fixture.debugElement.query(By.css('#add-area'));
    addAreaButton.nativeElement.click();
    expect(addArea).toHaveBeenCalledTimes(1);
  });

  it('should call addArea() if press enter', () => {
    const addAreaInput = jest.spyOn(component, 'addArea');
    const addAreaInputButton = fixture.debugElement.query(
      By.css('#add-area-input')
    ).nativeElement;
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    addAreaInputButton.dispatchEvent(event);
    expect(addAreaInput).toHaveBeenCalledTimes(1);
  });

  it('should call removeArea()', () => {
    component.areasControl.setValue(['Area 1', 'Area 2', 'Area 3']);
    fixture.detectChanges();
    const removeArea = jest.spyOn(component, 'removeArea');
    const removeAreaButton = fixture.debugElement.query(By.css('#remove-area'));
    removeAreaButton.nativeElement.click();
    expect(removeArea).toHaveBeenCalledTimes(1);
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
