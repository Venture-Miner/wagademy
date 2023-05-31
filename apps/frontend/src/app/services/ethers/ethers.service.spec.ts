import { TestBed } from '@angular/core/testing';
import { EthersService } from './ethers.service';
import { utils } from 'ethers';

jest.mock('ethers', () => {
  return {
    ethers: {
      providers: {
        Web3Provider: jest.fn(() => ({
          getSigner: jest.fn(() => ({
            _signTypedData: jest.fn(),
          })),
        })),
      },
    },
    utils: {
      splitSignature: jest.fn(),
    },
  };
});

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call splitSignature', () => {
    const splitSignatureSpyOn = jest.spyOn(utils, 'splitSignature');
    service.splitSignature('any_signature');
    expect(splitSignatureSpyOn).toHaveBeenCalledTimes(1);
  });
});
