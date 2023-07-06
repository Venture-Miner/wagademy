import { NavbarLandingModule } from '../landing/navbar-landing/navbar-landing.module';
import { NavbarAuthenticatedModule } from '../shared/navbar-authenticated/navbar-authenticated.module';
import { SuccessModalModule } from '../shared/success-modal/success-modal.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePublicComponent } from './profile-public.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

jest.mock('ethers');
jest.mock('@apollo/client/core');

describe('ProfilePublicComponent', () => {
  let component: ProfilePublicComponent;
  let fixture: ComponentFixture<ProfilePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePublicComponent],
      imports: [
        RouterTestingModule,
        NavbarLandingModule,
        NavbarAuthenticatedModule,
        SuccessModalModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "home"', () => {
    component.routerNavbar = true;
    fixture.detectChanges();
    const routerLink = fixture.debugElement
      .query(By.css('#home'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home');
  });

  it('should redirect to "landing"', () => {
    component.routerNavbar = false;
    fixture.detectChanges();
    const routerLink = fixture.debugElement
      .query(By.css('#landing'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/');
  });

  it('should redirect to "account-type"', () => {
    component.routerNavbar = false;
    fixture.detectChanges();
    const routerLink = fixture.debugElement
      .query(By.css('#account-type'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/account-type');
  });
});
