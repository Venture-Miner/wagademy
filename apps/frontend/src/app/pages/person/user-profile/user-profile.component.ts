import { Component } from '@angular/core';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wagademy-user-profile',
  standalone: true,
  imports: [ProfileComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {}
