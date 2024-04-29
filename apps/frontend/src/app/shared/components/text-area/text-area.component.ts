import {
  Component,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'wagademy-text-area',
  standalone: true,
  imports: [NgClass],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent {
  @Input() placeholder = '';

  @ViewChild('textarea', { static: true, read: ElementRef })
  elementRef!: ElementRef;

  constructor(
    private readonly renderer2: Renderer2,
    @Self() @Optional() private readonly control?: NgControl
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
