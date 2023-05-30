import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'wagademy-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css'],
})
export class MyContactsComponent {
  addRecommendationModal = false;
  followModal = false;
  form = this.fb.group({
    description: [''],
  });
  contacts = [
    {
      status: 'Online',
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
      status: 'Offline',
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
      status: 'Online',
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
      status: 'Offline',
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

  constructor(private fb: FormBuilder) {}

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }

  send() {
    //
  }

  follow() {
    //
  }
}
