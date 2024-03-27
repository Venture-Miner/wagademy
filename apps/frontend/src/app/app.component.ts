import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './shared/auth/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule, ToastComponent],
  selector: 'wagademy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.initiateListener();
  }
}
