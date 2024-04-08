import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  URL: string;

  constructor() {
    this.URL = environment.apiUrl;
  }
}