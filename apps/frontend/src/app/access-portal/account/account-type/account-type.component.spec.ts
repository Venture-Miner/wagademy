import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountTypeComponent } from './account-type.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { InputModule } from '../../../shared/input/input.module';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

jest.mock('ethers');

describe('AccountTypeComponent', () => {
  let component: AccountTypeComponent;
  let fixture: ComponentFixture<AccountTypeComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTypeComponent],
      imports: [
        ButtonPrimaryModule,
        NavbarModule,
        BaseModalModule,
        InputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AccountTypeComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      handle: fb.control(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call accountType as physicalPerson', () => {
    const accountType = fixture.debugElement.query(
      By.css('#physical-person')
    ).nativeElement;
    accountType.click();
    expect(component.accountType).toBe('physicalPerson');
  });

  it('should call accountType as company', () => {
    const accountType = fixture.debugElement.query(
      By.css('#company')
    ).nativeElement;
    accountType.click();
    expect(component.accountType).toBe('company');
  });

  it('should set showConnectWalletModal as true', () => {
    const showConnectWalletButton = fixture.debugElement.query(
      By.css('#show-wallet')
    ).nativeElement;
    showConnectWalletButton.click();
    expect(component.showConnectWalletModal).toBe(true);
  });
});
