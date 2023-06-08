import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditComponent } from './profile-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { By } from '@angular/platform-browser';
import { ProfileStepComponent } from '../create-profile';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ReactiveFormsModule } from '@angular/forms';

jest.mock('ethers');

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditComponent, ProfileStepComponent],
      imports: [
        RouterTestingModule,
        NavbarAuthenticatedModule,
        FormFieldModule,
        InputModule,
        TextAreaModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
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
