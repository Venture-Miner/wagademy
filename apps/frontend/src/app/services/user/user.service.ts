import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateCompanyProfile,
  CreateCompanyProfileResponse,
  CreateProfile,
  CreateProfileResponse,
  CreateUserFrontendDto,
  CreateUserResponse,
  FindOneCompanyProfileResponse,
  FindOneProfileResponse,
  RetrieveSelfResponse,
  UpdateCompanyProfile,
  UpdateCompanyProfileResponse,
  UpdateProfile,
  UpdateProfileResponse,
} from '@wagademy/types';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  create(): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.URL}/user`, {});
  }

  createCompanyProfile(
    createCompanyProfileDto: CreateCompanyProfile
  ): Observable<CreateCompanyProfileResponse> {
    const formData: FormData = new FormData();
    if (createCompanyProfileDto.companyPhoto)
      formData.append(
        'companyPhoto',
        createCompanyProfileDto.companyPhoto as File
      );
    Object.keys(createCompanyProfileDto).forEach((key) => {
      if (key !== 'companyPhoto') {
        formData.append(key, (createCompanyProfileDto as any)[key]);
      }
    });
    return this.http.post<CreateCompanyProfileResponse>(
      `${this.URL}/user/create-company-profile`,
      formData
    );
  }

  createUserProfile(
    createProfileDto: CreateProfile
  ): Observable<CreateProfileResponse> {
    const formData: FormData = new FormData();
    if (createProfileDto.profilePhoto)
      formData.append('profilePhoto', createProfileDto.profilePhoto as File);
    Object.keys(createProfileDto).forEach((key) => {
      if (
        key !== 'profilePhoto' &&
        key !== 'education' &&
        key !== 'professionalExperience'
      ) {
        formData.append(key, (createProfileDto as any)[key]);
      }
      if (key === 'education' || key === 'professionalExperience') {
        createProfileDto[key].forEach((item: any, index: number) => {
          Object.keys(item).forEach((subKey) => {
            if (item[subKey] || item[subKey] === false) {
              formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          });
        });
      }
    });
    return this.http.post<CreateProfileResponse>(
      `${this.URL}/user/create-profile`,
      formData
    );
  }

  self(): Observable<RetrieveSelfResponse> {
    return this.http.get<RetrieveSelfResponse>(`${this.URL}/user/self`);
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

  updateUserProfile(
    updateProfileDto: UpdateProfile
  ): Observable<UpdateProfileResponse> {
    const formData: FormData = new FormData();
    if (updateProfileDto.profilePhoto)
      formData.append('profilePhoto', updateProfileDto.profilePhoto as File);
    Object.keys(updateProfileDto).forEach((key) => {
      if (
        key !== 'profilePhoto' &&
        key !== 'education' &&
        key !== 'professionalExperience'
      ) {
        formData.append(key, (updateProfileDto as any)[key]);
      }
      if (key === 'education' || key === 'professionalExperience') {
        updateProfileDto[key]!.forEach((item: any, index: number) => {
          Object.keys(item).forEach((subKey) => {
            if (item[subKey]) {
              formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          });
        });
      }
    });
    return this.http.patch<UpdateProfileResponse>(
      `${this.URL}/user/profile`,
      formData
    );
  }

  findUserProfile(id: string): Observable<FindOneProfileResponse | null> {
    return this.http.get<FindOneProfileResponse | null>(
      `${this.URL}/user/user-profile/${id}`
    );
  }
}
