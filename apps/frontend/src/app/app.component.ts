import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './services/auth/auth.service';
import { ScheduleModule } from '@nestjs/schedule';

@Component({
  standalone: true,
  imports: [RouterModule, ToastComponent, ScheduleModule.forRoot()],
  selector: 'wagademy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.initiateListener();
  }
}
