import { omit } from '@/utils';
import { Injectable } from '@angular/core';
import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { ethers, utils } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EthersService {
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

  async signedTypeData(
    domain: TypedDataDomain,
    types: Record<string, any>,
    value: Record<string, any>
  ) {
    const signer = this.ethersProvider.getSigner();
    return signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename') as any,
      omit(value, '__typename')
    );
  }

  splitSignature(signature: string) {
    return utils.splitSignature(signature);
  }
}
