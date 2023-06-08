import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsAndCompetenciesEditStepComponent } from './skills-and-competencies-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../../shared/input/input.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('SkillsAndCompetenciesEditStepComponent', () => {
  let component: SkillsAndCompetenciesEditStepComponent;
  let fixture: ComponentFixture<SkillsAndCompetenciesEditStepComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsAndCompetenciesEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsAndCompetenciesEditStepComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      skillsAndCompetencies: fb.control([]),
    });
    fixture.detectChanges();
  });

  it('should create the component skills and competencies', () => {
    expect(component).toBeTruthy();
  });

  it('should call addSkill()', () => {
    const addSkill = jest.spyOn(component, 'addSkill');
    const addSkillButton = fixture.debugElement.query(By.css('#add-skill'));
    addSkillButton.nativeElement.click();
    expect(addSkill).toHaveBeenCalledTimes(1);
  });

  it('should call addSkill() if press enter', () => {
    const addSkillInput = jest.spyOn(component, 'addSkill');
    const addSkillInputButton = fixture.debugElement.query(
      By.css('#add-skill-input')
    ).nativeElement;
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    addSkillInputButton.dispatchEvent(event);
    expect(addSkillInput).toHaveBeenCalledTimes(1);
  });

  it('should call removeSkill()', () => {
    component.skillsControl.setValue(['Area 1', 'Area 2', 'Area 3']);
    fixture.detectChanges();
    const removeSkill = jest.spyOn(component, 'removeSkill');
    const removeSkillButton = fixture.debugElement.query(
      By.css('#remove-skill')
    );
    removeSkillButton.nativeElement.click();
    expect(removeSkill).toHaveBeenCalledTimes(1);
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
