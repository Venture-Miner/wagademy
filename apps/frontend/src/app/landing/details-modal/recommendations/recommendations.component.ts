import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent {
  @Input() data: any;
}
