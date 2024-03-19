import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'wagademy-jobs-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './jobs-details.component.html',
  styleUrl: './jobs-details.component.scss',
})
export class JobsDetailsComponent implements OnInit {
  images = '';
  title = '';
  description = '';
  jobType = '';
  allocation = '';
  responsibilities = '';
  company = '';
  infos = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const images = params.get('images');
      if (images) this.images = images;
      const title = params.get('title');
      if (title) this.title = title;
      const description = params.get('description');
      if (description) this.description = description;
      const jobType = params.get('jobType');
      if (jobType) this.jobType = jobType;
      const allocation = params.get('allocation');
      if (allocation) this.allocation = allocation;
      const responsibilities = params.get('responsibilities');
      if (responsibilities) this.responsibilities = responsibilities;
      const company = params.get('company');
      if (company) this.company = company;
      const infos = params.get('infos');
      if (infos) this.infos = infos;
    });
  }
}
