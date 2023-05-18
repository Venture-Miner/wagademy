import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getHostname } from '@/utils';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  URL: string;

  constructor() {
    this.URL = environment.urlBase[getHostname()];
  }
}
