import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('toggleNavbarButton') toggleNavbarButton!: ElementRef;
  @ViewChild('list') list!: ElementRef;

  readonly PHYSICAL_PERSON = AccountTypeEnum.PHYSICAL_PERSON;
  readonly COMPANY = AccountTypeEnum.COMPANY;

  constructor(private authService: AuthService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as Node;
      const isOutsideToggleButton =
        this.toggleButton && !this.toggleButton.nativeElement.contains(target);
      const isOutsideDropdown =
        this.dropdown && !this.dropdown.nativeElement.contains(target);
      const isOutsideNavbarButton =
        this.toggleNavbarButton &&
        !this.toggleNavbarButton.nativeElement.contains(target);
      const isOutsideList =
        this.list && !this.list.nativeElement.contains(target);
      if (isOutsideToggleButton && isOutsideDropdown) {
        this.openMenu = false;
      }
      if (isOutsideNavbarButton && isOutsideList) {
        this.showMenu = false;
      }
    });
  }

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
