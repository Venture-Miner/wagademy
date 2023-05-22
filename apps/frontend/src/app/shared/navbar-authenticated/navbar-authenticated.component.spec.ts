import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarAuthenticatedComponent } from './navbar-authenticated.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DropdownLanguageComponent } from './dropdown-language/dropdown-language.component';
import { DropdownProfileComponent } from './dropdown-profile/dropdown-profile.component';

jest.mock('ethers');

describe('NavbarAuthenticatedComponent', () => {
  let component: NavbarAuthenticatedComponent;
  let fixture: ComponentFixture<NavbarAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavbarAuthenticatedComponent,
        DropdownLanguageComponent,
        DropdownProfileComponent,
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarAuthenticatedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
