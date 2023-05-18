import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHostname } from '@/utils/hostname';
import { Squad } from '@/interfaces';
import { CreateSquadDto } from '@/dtos';
import { TokenService } from '../token';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  URL = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.URL = environment.urlBase[getHostname()];
  }

  joinSquad(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getTokenValue()}`,
    });
    return this.http.patch<Squad>(
      `${this.URL}/squad/join/${id}`,
      {},
      { headers }
    );
  }

  getSquads() {
    return this.http.get<Squad[]>(`${this.URL}/squad`);
  }

  getSquad(id: string) {
    return this.http.get<Squad>(`${this.URL}/squad/${id}`);
  }

  quitSquad(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getTokenValue()}`,
    });
    return this.http.patch<Squad>(
      `${this.URL}/squad/quit/${id}`,
      {},
      { headers }
    );
  }

  createSquad(createSquadDto: CreateSquadDto) {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getTokenValue()
    );
    return this.http.post<Squad>(`${this.URL}/squad`, createSquadDto, {
      headers,
    });
  }
}
