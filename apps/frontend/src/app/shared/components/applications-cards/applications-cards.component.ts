import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wagademy-applications-cards',
  standalone: true,
  imports: [],
  templateUrl: './applications-cards.component.html',
  styleUrls: ['./applications-cards.component.scss'],
})
export class ApplicationsCardsComponent {
  @Input() name: string | undefined;
  @Input() company: string | undefined;
  @Output() actionButtonClick = new EventEmitter<void>();
  @Input() disabled = false;

  onActionButtonClick() {
    this.actionButtonClick.emit();
  }
}
