import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountTypeComponent } from './account-type.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';

jest.mock('ethers');

describe('AccountTypeComponent', () => {
  let component: AccountTypeComponent;
  let fixture: ComponentFixture<AccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTypeComponent],
      imports: [ButtonPrimaryModule, NavbarModule, HttpClientModule],
    }).compileComponents();
    window.ethereum = {
      on: jest.fn(),
    };
    fixture = TestBed.createComponent(AccountTypeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
