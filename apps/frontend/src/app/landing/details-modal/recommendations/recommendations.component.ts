import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent {
  @Input() data: any;
}
