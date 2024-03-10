import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'wagademy-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() count = 0;
  @Input() take = 10;
  @Input() page = 1;
  @Input() disabled = false;

  @Output() pageChange = new EventEmitter<number>();
}
