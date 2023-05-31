import { TestBed } from '@angular/core/testing';
import { AccountTypePersonGuard } from './account-type-person.guard';

jest.mock('ethers');

describe('AccountTypePersonGuard', () => {
  let guard: AccountTypePersonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountTypePersonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
