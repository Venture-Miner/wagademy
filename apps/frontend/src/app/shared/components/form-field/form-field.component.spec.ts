import { TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormFieldComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, RouterTestingModule],
    }).compileComponents();
  });
});
