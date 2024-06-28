import { Injectable } from '@angular/core';
import { environment } from 'apps/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  URL: string;

  constructor() {
    this.URL = environment.apiUrl;
  }
}
