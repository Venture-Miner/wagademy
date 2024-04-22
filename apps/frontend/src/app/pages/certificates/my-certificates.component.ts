import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';

interface Course {
  name: string;
  description: string;
  img: string;
  status: string;
  progress: number;
}

@Component({
  selector: 'wagademy-my-certificates',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    TitleCasePipe,
    NgClass,
    FormsModule,
    PaginationComponent,
    NgIf,
    ConfirmationModalComponent,
    CertificateComponent,
    InputSearchComponent,
  ],
  templateUrl: './my-certificates.component.html',
  styleUrl: './my-certificates.component.css',
})
export class MyCertificatesComponent {
  displayStyle = localStorage.getItem('displayStyle') || 'grid';
  searchTerm = '';
  page = 1;
  take = 1;
  count = 5;
  selectedCourse: Course | null = null;
  displayCertificate = false;

  courses: Course[] = [
    {
      name: 'Angular',
      description: 'Amet minim mollit non deserunt Amet',
      img: 'https://via.placeholder.com/80',
      status: 'unclaimed',
      progress: 100,
    },
    {
      name: 'React',
      description: 'Amet minim mollit non deserunt',
      img: 'https://via.placeholder.com/80',
      status: 'claimed',
      progress: 100,
    },
    {
      name: 'Vue',
      description: 'Amet minim mollit non deserunt',
      img: 'https://via.placeholder.com/80',
      status: 'unclaimed',
      progress: 100,
    },
    {
      name: 'Angular',
      description: 'Amet minim mollit non deserunt',
      img: 'https://via.placeholder.com/80',
      status: 'claimed',
      progress: 100,
    },
  ];

  setDisplayStyle(style: string) {
    this.displayStyle = style;
    localStorage.setItem('displayStyle', style);
  }

  get filteredCourses() {
    if (this.searchTerm) {
      return this.courses.filter((course: Course) =>
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return this.courses;
    }
  }

  showCertificate() {
    window.modal['close']();
    this.displayCertificate = true;
  }

  getCourses() {
    //
  }
}
