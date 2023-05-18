import { Component, OnInit } from '@angular/core';
import { TokenService } from '@/services';

@Component({
  selector: 'lens-academy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lens';

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.tokenService.autoRefresh();
  }
}
