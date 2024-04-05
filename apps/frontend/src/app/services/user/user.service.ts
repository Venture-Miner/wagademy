import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUser,
  CreateUserResponse,
  RetrieveSelfResponse,
} from '@wagademy/types';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  create(createUserDto: CreateUser): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.URL}/user`,
      createUserDto
    );
  }

  self(): Observable<RetrieveSelfResponse> {
    return this.http.get<RetrieveSelfResponse>(`${this.URL}/user/self`);
  }
}
