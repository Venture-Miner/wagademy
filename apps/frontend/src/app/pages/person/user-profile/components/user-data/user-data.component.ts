import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';
import {
  SelectComponent,
  SelectItem,
} from '../../../../../shared/components/select/select.component';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { TextAreaComponent } from '../../../../../shared/components/text-area/text-area.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';

export type UserData = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  birth: FormControl<string | null>;
  cellphone: FormControl<string | null>;
  country: FormControl<SelectItem<string> | null>;
  state: FormControl<SelectItem<string> | null>;
  about: FormControl<string | null>;
};

@Component({
  selector: 'wagademy-user-data',
  standalone: true,
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    SelectComponent,
    InputComponent,
    TextAreaComponent,
    PhotoUploadComponent,
  ],
})
export class UserDataComponent {
  @Input() userData!: FormGroup<UserData>;
  @Input() profilePhoto!: string | undefined;
  @Output() nextStep = new EventEmitter<void>();
  @Output() imageUploaded = new EventEmitter<string>();

  mockCountries: SelectItem<string>[] = [
    { value: 'BR', label: 'Brazil' },
    { value: 'EUA', label: 'United States' },
  ];

  mockStates: SelectItem<string>[] = [
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'TX', label: 'Texas' },
  ];

  onImageUploaded(imageUrl: string) {
    this.imageUploaded.emit(imageUrl);
  }
}
