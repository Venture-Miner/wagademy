import { Component, OnInit } from '@angular/core';
import { TokenService } from './services';

@Component({
  selector: 'wagademy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Wagademy';

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.tokenService.autoRefresh();
  }
}
