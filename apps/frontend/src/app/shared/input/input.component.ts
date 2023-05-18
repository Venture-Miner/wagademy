export type HTMLInputTypeAttribute =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'date'
  | 'tel'
  | 'search';

import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lens-academy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() type: HTMLInputTypeAttribute = 'text';

  @ViewChild('input', { static: true, read: ElementRef })
  elementRef!: ElementRef;

  constructor(private renderer2: Renderer2) {}

  private onChange = (_: unknown) => {};

  private onTouched = () => {};

  registerOnChange(fn: (_: unknown) => unknown) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => unknown) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer2.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  onInputChange() {
    const value = this.elementRef.nativeElement.value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
