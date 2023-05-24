import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { LensService } from '../lens';

jest.mock('ethers');
const jwt_decode = jest.mock('jwt-decode');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4ODI1RkIyOTNCNDM5OTVEODQ5NDY5MTA0YUFiRDQ1MDNCZDZiRDI3MSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2ODQ3ODgyMjEsImV4cCI6MTY4NDc5MDAyMX0.X6DFcIK9elkFK8TpPZTLTbI5DNQr4mOLmu-en19NSQM';
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4ODI1RkIyOTNCNDM5OTVEODQ5NDY5MTA0YUFiRDQ1MDNCZDZiRDI3MSIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjg0Nzg4MjIxLCJleHAiOjE2ODUzOTMwMjF9.yc4siKSexG3W4QQoH27pslVC-8AIy8pvWzswO7F6ZR8';
const exp = 1684790021;
const refreshExp = 1685393021;
const wallet = '0x825FB293B43995D849469104aAbD4503Bd6bD271';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LensService,
          useValue: {
            ethersService: {},
            client: {
              mutate: jest.fn().mockReturnValue({
                data: { refresh: { refreshToken, accessToken: token } },
              }),
            },
          },
        },
      ],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token', () => {
    service.setToken(token);
    expect(service.getTokenValue()).toEqual(token);
  });

  it('should set token expiration', () => {
    service.setTokenExpiration(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);
    expect(new Date(service.getTokenExpirationValue())).toEqual(expirationDate);
  });

  it('should setRefreshToken', () => {
    service.setRefreshToken(refreshToken);
    expect(service.getRefreshTokenValue()).toEqual(refreshToken);
  });

  it('should set refresh token expiration', () => {
    service.setRefreshTokenExpirationTime(refreshToken);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(refreshExp);
    expect(new Date(service.getRefreshTokenExpirationValue())).toEqual(
      expirationDate
    );
  });

  it('should getToken', () => {
    let response;
    service.getToken().subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(token);
  });

  it('should getTokenValue', () => {
    const response = service.getTokenValue();
    expect(response).toEqual(token);
  });

  it('should getRefreshTokenValue', () => {
    const response = service.getRefreshTokenValue();
    expect(response).toEqual(refreshToken);
  });

  it('should getTokenExpirationValue', () => {
    const response = service.getTokenExpirationValue();
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);
    expect(new Date(response)).toEqual(expirationDate);
  });

  it('should getRefreshTokenExpirationValue', () => {
    const response = service.getRefreshTokenExpirationValue();
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(refreshExp);
    expect(new Date(response)).toEqual(expirationDate);
  });

  it('should getWalletAddress', () => {
    const response = service.getWalletAddress();
    expect(response).toEqual(wallet);
  });

  it('should getRefreshToken', async () => {
    await service.getRefreshToken(refreshToken);
    expect(service.getTokenValue()).toEqual(token);
    expect(service.getRefreshTokenValue()).toEqual(refreshToken);
  });

  it('should logout', () => {
    service.logout();
    expect(service.getTokenValue()).toBe('');
    expect(service.getRefreshTokenValue()).toBe('');
    expect(service.getTokenExpirationValue()).toBe('');
    expect(service.getRefreshTokenExpirationValue()).toBe('');
  });
});
