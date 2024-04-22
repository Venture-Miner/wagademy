import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUserFrontendDto,
  CreateUserResponse,
  FindOneCompanyProfileResponse,
  FindOneProfileResponse,
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

  create(createUserDto: CreateUserFrontendDto): Observable<CreateUserResponse> {
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
    const formData: FormData = new FormData();
    if (updateProfileDto.companyPhoto)
      formData.append('companyPhoto', updateProfileDto.companyPhoto as File);
    if (updateProfileDto.backgroundPhoto)
      formData.append(
        'backgroundPhoto',
        updateProfileDto.backgroundPhoto as File
      );
    Object.keys(updateProfileDto).forEach((key) => {
      if (key !== 'companyPhoto' && key !== 'backgroundPhoto') {
        formData.append(key, (updateProfileDto as any)[key]);
      }
    });
    return this.http.patch<UpdateCompanyProfileResponse>(
      `${this.URL}/user/company-profile`,
      formData
    );
  }

  findUserProfile(id: string): Observable<FindOneProfileResponse | null> {
    return this.http.get<FindOneProfileResponse | null>(
      `${this.URL}/user/user-profile/${id}`
    );
  }
}
