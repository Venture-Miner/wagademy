import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'wagademy-applications-profile',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    NgFor,
    CardComponent,
    RouterModule,
    NgFor,
    ModalComponent,
  ],
  templateUrl: './applications-profile.component.html',
  styleUrl: './applications-profile.component.scss',
})
export class ApplicationsProfileComponent {
  image = './assets/img/images/img-profile-photo.png';
  name = 'Marvin Wilson';
  email = 'randall.cooper@email.com';
  phone = '+55 11 912345-6789';
  job = 'Software Developer';
  description =
    'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.';
  modality = 'Full time';
  schedule = 'Remote work';
  locale = 'USA';
  birthday = '01/10/1977';
  state = 'Los Angeles';
  about =
    'Im Randall, a Software Engineering professional with 15 years experience, specializing in Project Management. Skilled in leadership, strategic planning, and effective communication, I prioritize tasks, maintain high productivity, and value collaboration. Always seeking growth opportunities.';
  course =
    'bachelor Federal University of Minas Gerais (UFMG) - Belo Horizonte, Minas Gerais';
  period = '02 / 2020 - 02 / 2024';
  courseDescription =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ';
  company = 'Company';
  periodWork = '02 / 2020 - Current work';
  jobDescription =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ';
  areaOfExpertise = [
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
  ];
  skillsAndCompetences = [
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
  ];

  sendInvite() {
    //
  }
}
