import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wagademy-cards',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() name: string | undefined;
  @Input() img: string | undefined;
  @Input() description: string | undefined;
  @Input() selectId: string | undefined;
  @Input() button: string | undefined;

  constructor(private router: Router) {}

  onViewMoreClick() {
    this.router.navigate(['/'], {
      queryParams: {
        selectId: this.selectId,
      },
    });
  }
}
