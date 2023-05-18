import { About } from '../../../../../interfaces/types';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  _about: About | undefined;
  @Input() set about(about: About) {
    if (!about) return;
    this.completed = +((Object.keys(about).length / 7) * 100).toFixed(2);
    this._about = about;
  }
  completed = 0;
}
