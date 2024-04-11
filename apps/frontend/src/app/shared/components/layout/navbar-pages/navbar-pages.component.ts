import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountTypeEnum } from '@wagademy/types';

@Component({
  standalone: true,
  selector: 'wagademy-navbar-pages',
  templateUrl: './navbar-pages.component.html',
  styleUrls: ['./navbar-pages.component.scss'],
  imports: [RouterModule, NgClass],
})
export class NavbarPagesComponent {
  showMenu = false;
  existingProfileImage = './assets/img/images/img-user-profile.svg';
  openMenu = false;
  accountType!: AccountTypeEnum;

  readonly PHYSICAL_PERSON = AccountTypeEnum.PHYSICAL_PERSON;
  readonly COMPANY = AccountTypeEnum.COMPANY;

  constructor() {
    this.accountType = AccountTypeEnum.COMPANY;
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDropdown() {
    this.openMenu = !this.openMenu;
  }
}
