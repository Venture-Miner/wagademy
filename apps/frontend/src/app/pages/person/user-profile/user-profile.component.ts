import { Component } from '@angular/core';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';

@Component({
  selector: 'wagademy-user-profile',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {}
