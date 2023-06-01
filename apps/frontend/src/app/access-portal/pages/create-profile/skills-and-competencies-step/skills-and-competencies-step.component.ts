import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wagademy-skills-and-competencies-step',
  templateUrl: './skills-and-competencies-step.component.html',
  styleUrls: ['./skills-and-competencies-step.component.css'],
})
export class SkillsAndCompetenciesStepComponent {
  @Input() form!: FormGroup;
  @Input() mode!: 'CREATE' | 'EDIT' | 'VIEW' | 'CREATED';
  @Input() skillForm = this.fb.group({
    skill: ['', Validators.required],
  });
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get skills() {
    return this.skillsControl.value;
  }

  get skillsControl() {
    return this.form.get('skillsAndCompetencies')!;
  }

  get skill() {
    return this.skillControl.value;
  }

  get skillControl() {
    return this.skillForm.get('skill')!;
  }

  addSkill() {
    if (!this.skill || this.skill.length < 1) return;
    this.skillsControl.setValue([...this.skills, this.skill]);
    this.skillControl.reset();
    if (this.skills.length >= 10) this.skillControl.disable();
  }

  removeSkill(skillIndex: number) {
    const filteredSkills = this.skills.filter(
      (_: string, index: number) => index !== skillIndex
    );
    this.skillsControl.setValue(filteredSkills);
    this.skillControl.enable();
  }
}
