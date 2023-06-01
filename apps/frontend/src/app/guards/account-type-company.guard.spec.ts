import { TestBed } from '@angular/core/testing';
import { AccountTypeCompanyGuard } from './account-type-company.guard';

jest.mock('ethers');

describe('AccountTypeCompanyGuard', () => {
  let guard: AccountTypeCompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountTypeCompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
