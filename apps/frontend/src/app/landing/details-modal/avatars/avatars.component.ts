import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css'],
})
export class AvatarsComponent {
  @Input() type: 'SQUAD' | 'RESUME' | 'TEACHER' = 'RESUME';
  @Input() data: any;
}
