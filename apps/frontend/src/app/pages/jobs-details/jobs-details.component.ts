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
  name = '';
  description = '';
  time = '';
  locale = '';
  responsibilities = '';
  company = '';
  infos = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const images = params.get('images');
      if (images) this.images = images;
      const name = params.get('name');
      if (name) this.name = name;
      const description = params.get('description');
      if (description) this.description = description;
      const time = params.get('time');
      if (time) this.time = time;
      const locale = params.get('locale');
      if (locale) this.locale = locale;
      const responsibilities = params.get('responsibilities');
      if (responsibilities) this.responsibilities = responsibilities;
      const company = params.get('company');
      if (company) this.company = company;
      const infos = params.get('infos');
      if (infos) this.infos = infos;
    });
  }
}
