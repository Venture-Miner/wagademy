import { TestBed } from '@angular/core/testing';
import { EthersService } from './ethers.service';
import { utils, ethers } from 'ethers';

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
const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

describe('EthersService', () => {
  let service: EthersService;
  let signer: ethers.providers.JsonRpcSigner;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersService);
    signer = ethersProvider.getSigner();
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
