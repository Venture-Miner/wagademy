import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { HTMLInputTypeAttribute } from '../../types/html-input-type-attribute';
import { NgClass, NgIf } from '@angular/common';
import { InputRightButtonType } from '../../types/input-right-button-type';

@Component({
  standalone: true,
  imports: [NgClass, NgIf],
  selector: 'wagademy-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() leftIcon = '';
  @Input() rightButtonType: InputRightButtonType | undefined;
  @Input() type: HTMLInputTypeAttribute = 'text';
  @Input() readonly = false;
  @Input() isRightButtonDisabled = false;
  @Input() value = '';

  @Output() rightButtonClick = new EventEmitter<void>();

  showPassword = false;
  rightButtonMap = {
    password: {
      action: () => {
        this.showPassword = !this.showPassword;
        this.rightButtonMap.password.icon = this.showPassword
          ? 'bi bi-eye'
          : 'bi bi-eye-slash';
      },
      icon: this.showPassword ? 'bi bi-eye' : 'bi bi-eye-slash',
    },
    edit: {
      action: () => this.rightButtonClick.emit(),
      icon: 'bi bi-pencil',
    },
  };

  @ViewChild('input', { static: true, read: ElementRef })
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
