import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditComponent } from './profile-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { By } from '@angular/platform-browser';

jest.mock('ethers');

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditComponent],
      imports: [RouterTestingModule, NavbarAuthenticatedModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component profile edit', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "home"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-home'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile');
  });
});
