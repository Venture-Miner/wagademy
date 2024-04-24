import { Component } from '@angular/core';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'wagademy-build-training-data',
  standalone: true,
  imports: [
    SelectComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './build-training-data.component.html',
  styleUrl: './build-training-data.component.scss',
})
export class BuildTrainingDataComponent {
  items: any[] = Array(5).fill({});
  form = this.fb.group({
    chatOption: ['', [Validators.required]],
    chatTheme: ['', Validators.required],
    userQuestion: [''],
    answerQuestion: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addNewItem() {
    this.items.push({});
  }

  saveItems() {
    //
  }
}
