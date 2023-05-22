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
              mutate: jest
                .fn()
                .mockReturnValue({ data: { refresh: { refreshToken } } }),
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
});
