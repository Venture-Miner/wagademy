import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getHostname } from '../../utils';
import { TokenService } from '../token';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  URL = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.URL = environment.urlBase[getHostname()];
  }

  uploadIpfs(data: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getTokenValue()
    );
    return this.http.post<{ path: string }>(
      `${this.URL}/ipfs/create-post`,
      data,
      { headers }
    );
  }
}
