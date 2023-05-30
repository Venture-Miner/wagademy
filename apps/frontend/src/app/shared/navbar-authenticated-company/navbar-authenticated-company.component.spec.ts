import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarAuthenticatedCompanyComponent } from './navbar-authenticated-company.component';
import { DropdownProfileCompanyComponent } from './dropdown-profile-company/dropdown-profile-company.component';
import { DropdownLanguageModule } from '../dropdown-language/dropdown-language.module';

jest.mock('ethers');

describe('NavbarAuthenticatedCompanyComponent', () => {
  let component: NavbarAuthenticatedCompanyComponent;
  let fixture: ComponentFixture<NavbarAuthenticatedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavbarAuthenticatedCompanyComponent,
        DropdownProfileCompanyComponent,
      ],
      imports: [RouterTestingModule, DropdownLanguageModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarAuthenticatedCompanyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
