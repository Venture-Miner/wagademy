import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wagademy-area-of-interest-step',
  templateUrl: './area-of-interest-step.component.html',
  styleUrls: ['./area-of-interest-step.component.css'],
})
export class AreaOfInterestStepComponent {
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
    return this.form.get('interest')!;
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
