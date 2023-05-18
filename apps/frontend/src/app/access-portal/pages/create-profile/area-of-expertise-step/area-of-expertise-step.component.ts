/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lens-academy-area-of-expertise-step',
  templateUrl: './area-of-expertise-step.component.html',
  styleUrls: ['./area-of-expertise-step.component.css'],
})
export class AreaOfExpertiseStepComponent {
  @Input() form!: FormGroup;
  @Input() mode!: 'CREATE' | 'EDIT' | 'VIEW' | 'CREATED';
  @Input() areaForm = this.fb.group({
    area: ['', Validators.required],
  });
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get areas() {
    return this.areasControl.value;
  }

  get areasControl() {
    return this.form.get('expertise')!;
  }

  get area() {
    return this.areaControl.value;
  }

  get areaControl() {
    return this.areaForm.get('area')!;
  }

  addArea() {
    if (!this.area || this.area.length < 1) return;
    this.areasControl.setValue([...this.areas, this.area]);
    this.areaControl.reset();
    if (this.areas.length >= 10) this.areaControl.disable();
  }

  removeArea(areaIndex: number) {
    const filteredAreas = this.areas.filter(
      (_: string, index: number) => index !== areaIndex
    );
    this.areasControl.setValue(filteredAreas);
    this.areaControl.enable();
  }
}
