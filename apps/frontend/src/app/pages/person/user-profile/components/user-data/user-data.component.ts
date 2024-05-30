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
import { ToastService } from '../../../../../services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { State } from '../../user-profile.component';

export type UserData = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  dateOfBirth: FormControl<Date | null>;
  contactNumber: FormControl<string | null>;
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
  @Input() countries!: SelectItem<string>[];
  @Input() userData!: FormGroup<UserData>;
  @Input() profilePhoto!: string | undefined;
  @Output() nextStep = new EventEmitter<void>();
  @Output() imageUploaded = new EventEmitter<{ url: string; file: File }>();
  states: SelectItem<string>[] = [];

  selectedCountry: string | null = '';

  constructor(private toastService: ToastService, private http: HttpClient) {}

  onImageUploaded(imageData: { url: string; file: File }) {
    this.imageUploaded.emit(imageData);
  }

  onCountrySelect(event: any) {
    this.selectedCountry = event;
    this.states = [];
    if (this.selectedCountry) {
      this.getStates(this.selectedCountry);
    }
  }

  getStates(countryIso2: string) {
    this.http.get<State[]>('./assets/countries/states.json').subscribe({
      next: (data: State[]) => {
        const filteredStates = data.filter(
          (state) => state.country_code === countryIso2
        );
        this.states = filteredStates.map((state) => ({
          value: state.name,
          label: state.name,
        }));
      },
      error: () => {
        this.toastService.showToast({
          message: 'Failed fetching states.',
          type: 'error',
        });
      },
    });
  }
}
