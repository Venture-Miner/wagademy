import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-areas-of-interest',
  templateUrl: './areas-of-interest.component.html',
  styleUrls: ['./areas-of-interest.component.css'],
})
export class AreasOfInterestComponent {
  @Input() interest: string[] = [];
}
