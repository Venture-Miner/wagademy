import { Component } from '@angular/core';

@Component({
  selector: 'wagademy-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css'],
})
export class FriendRequestsComponent {
  requests = [
    {
      status: 'pending',
      name: 'Name Example',
      age: 31,
      interest: [
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
      ],
    },
    {
      status: 'pending',
      name: 'Name Example',
      age: 20,
      interest: [
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
      ],
    },
    {
      status: 'pending',
      name: 'Name Example',
      age: 31,
      interest: [
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
      ],
    },
    {
      status: 'pending',
      name: 'Name Example',
      age: 20,
      interest: [
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
        'Example',
      ],
    },
  ];

  accept() {
    //
  }

  delete() {
    //
  }
}
