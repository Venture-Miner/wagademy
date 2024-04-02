import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wagademy-applications-profile',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './applications-results.component.html',
  styleUrl: './applications-results.component.scss',
})
export class ApplicationsResultsComponent {
  image = './assets/img/images/img-default-profile.svg';
  name = 'Marvin Wilson';
  email = 'randall.cooper@email.com';
  phone = '+55 11 912345-6789';
  job = 'Software Developer';
  description =
    'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.';
  modality = 'Full time';
  schedule = 'Remote work';
  questions = [
    {
      asking: '01 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '02 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '03 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '04 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '05 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '06 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
  ];
}
