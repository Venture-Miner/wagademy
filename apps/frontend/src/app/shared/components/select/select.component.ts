import { NgClass, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export interface SelectItem<T> {
  value: T;
  label: string;
}

@Component({
  standalone: true,
  imports: [NgClass, NgFor],
  selector: 'wagademy-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: SelectItem<string | number | boolean>[] = [];
  @Input() placeholder = 'Select';

  @ViewChild('select', { static: true, read: ElementRef })
  elementRef!: ElementRef;

  constructor(
    private renderer2: Renderer2,
    @Self() @Optional() private control?: NgControl
  ) {
    if (this.control) this.control.valueAccessor = this;
  }

  hasError() {
    return !!(this.control?.invalid && this.control.touched);
  }

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
