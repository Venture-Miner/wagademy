import { Injectable } from '@angular/core';
import { Web3Modal } from '@web3modal/html';
import { configureChains, createConfig, watchAccount } from '@wagmi/core';
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private accountSource = new Subject<any>();
  ethereumClient!: EthereumClient;
  web3Modal!: Web3Modal;

  constructor() {
    this.initializeWallet();
  }

  initializeWallet() {
    try {
      const chains = [arbitrum, mainnet, polygon];
      const projectId = environment.projectId;
      const { publicClient } = configureChains(chains, [
        w3mProvider({ projectId }),
      ]);
      const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient,
      });
      this.ethereumClient = new EthereumClient(wagmiConfig, chains);
      this.web3Modal = this.configureWeb3Modal(projectId);
      this.initializeAccountWatch();
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  }

  configureWeb3Modal(projectId: string): Web3Modal {
    return new Web3Modal(
      {
        projectId,
        themeMode: 'light',
        themeVariables: {
          '--w3m-background-color': '#F9F9F9',
          '--w3m-accent-color': '#51B7AF',
          '--w3m-logo-image-url': './assets/img/images/img-logo-navbar.webp',
        },
      },
      this.ethereumClient
    );
  }

  initializeAccountWatch(): void {
    watchAccount((account) => {
      this.accountSource.next(account);
    });
  }
}
