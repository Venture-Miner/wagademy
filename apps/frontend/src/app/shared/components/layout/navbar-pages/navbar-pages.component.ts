import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountTypeEnum } from '@wagademy/types';
import { AuthService } from '../../../../services/auth/auth.service';
import { Hub } from 'aws-amplify/utils';

@Component({
  standalone: true,
  selector: 'wagademy-navbar-pages',
  templateUrl: './navbar-pages.component.html',
  styleUrls: ['./navbar-pages.component.scss'],
  imports: [RouterModule, NgClass],
})
export class NavbarPagesComponent implements OnInit {
  showMenu = false;
  existingProfileImage = './assets/img/images/img-user-profile.svg';
  openMenu = false;
  accountType!: AccountTypeEnum;

  readonly PHYSICAL_PERSON = AccountTypeEnum.PHYSICAL_PERSON;
  readonly COMPANY = AccountTypeEnum.COMPANY;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getUserData()
      .then((user) => {
        if (user) {
          this.accountType = user.accountType;
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDropdown() {
    this.openMenu = !this.openMenu;
  }

  logout() {
    Hub.dispatch('auth', {
      event: 'signedOut',
    });
  }
}
