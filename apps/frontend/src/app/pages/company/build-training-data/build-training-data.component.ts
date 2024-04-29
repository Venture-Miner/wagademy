import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'wagademy-build-training-data',
  standalone: true,
  imports: [
    SelectComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './build-training-data.component.html',
  styleUrl: './build-training-data.component.scss',
})
export class BuildTrainingDataComponent implements OnInit {
  items: any[] = Array(5).fill({});
  form = this.fb.group({
    chatOption: ['', [Validators.required]],
    chatTheme: ['', Validators.required],
    userQuestion: [''],
    answerQuestion: [''],
  });
  isLoading = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.isLoading = true;
  }

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
