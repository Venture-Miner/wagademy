import { Component } from '@angular/core';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';

@Component({
  selector: 'wagademy-profile-view-and-edit',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './profile-view-and-edit.component.html',
  styleUrl: './profile-view-and-edit.component.css',
})
export class ProfileViewAndEditComponent {}
