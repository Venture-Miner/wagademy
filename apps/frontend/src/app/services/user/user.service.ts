import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUser,
  CreateUserResponse,
  FindOneCompanyProfileResponse,
  RetrieveSelfResponse,
  UpdateCompanyProfile,
  UpdateCompanyProfileResponse,
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

  self(): Observable<RetrieveSelfResponse | null> {
    return this.http.get<RetrieveSelfResponse | null>(`${this.URL}/user/self`);
  }

  findCompanyProfile(
    id: string
  ): Observable<FindOneCompanyProfileResponse | null> {
    return this.http.get<FindOneCompanyProfileResponse | null>(
      `${this.URL}/user/company-profile/${id}`
    );
  }

  updateCompanyProfile(
    updateProfileDto: UpdateCompanyProfile
  ): Observable<UpdateCompanyProfileResponse> {
    return this.http.patch<UpdateCompanyProfileResponse>(
      `${this.URL}/user/company-profile`,
      updateProfileDto
    );
  }
}
