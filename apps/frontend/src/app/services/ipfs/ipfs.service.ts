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

  createPost(data: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getTokenValue()
    );
    return this.http.post<{ cid: string }>(
      `${this.URL}/ipfs/create-post`,
      data,
      {
        headers,
      }
    );
  }

  uploadImage(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'certificate');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getTokenValue()
    );
    return this.http.post<{ cid: string }>(
      `${this.URL}/ipfs/upload-image`,
      formData,
      {
        headers,
      }
    );
  }
}
