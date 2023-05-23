import { TestBed } from '@angular/core/testing';
import { EthersService } from './ethers.service';

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

  it('should call signedTypeData', async () => {
    const signedTypeDataSpyOn = jest.spyOn(service, 'signedTypeData');
    await service.signedTypeData(
      {
        name: 'any_name',
        chainId: 'any_id',
        salt: 'any_salt',
        version: 'any_version',
      },
      {},
      {}
    );
    expect(signedTypeDataSpyOn).toHaveBeenCalledTimes(1);
  });

  it('should call splitSignature', () => {
    const splitSignatureSpyOn = jest.spyOn(service, 'splitSignature');
    service.splitSignature('any_signature');
    expect(splitSignatureSpyOn).toHaveBeenCalledTimes(1);
  });
});
