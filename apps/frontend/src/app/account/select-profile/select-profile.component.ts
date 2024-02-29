import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'wagademy-select-profile',
  standalone: true,
  imports: [RouterModule, NgClass],
  providers: [WalletService],
  templateUrl: './select-profile.component.html',
  styleUrl: './select-profile.component.scss',
})
export class SelectProfileComponent {
  physicalPerson = false;
  company = false;

  constructor(private walletService: WalletService) {}

  selectPhysicalPerson() {
    this.physicalPerson = !this.physicalPerson;
    this.company = false;
  }

  selectCompany() {
    this.company = !this.company;
    this.physicalPerson = false;
  }

  connectWallet() {
    this.walletService.web3Modal.openModal();
  }
}
