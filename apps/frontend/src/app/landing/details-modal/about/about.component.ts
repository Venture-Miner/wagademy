import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  @Input() data: any;
}
