import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css'],
})
export class CompanyCardComponent {
  @Input() name = '';
  @Input() bio = '';
}
