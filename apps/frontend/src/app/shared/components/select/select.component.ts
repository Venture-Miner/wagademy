import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface SelectItem<T> {
  value: T;
  label: string;
}

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'wagademy-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() items: SelectItem<string | number | boolean>[] = [];
  @Input() placeholder = 'Select';
}
