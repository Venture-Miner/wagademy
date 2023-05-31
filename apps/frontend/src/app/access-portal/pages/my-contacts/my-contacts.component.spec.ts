import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContactsComponent } from './my-contacts.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { InputModule } from '../../../shared/input/input.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { TokenService } from '../../../services';
import { of } from 'rxjs';

jest.mock('ethers');

describe('MyContactsComponent', () => {
  let component: MyContactsComponent;
  let fixture: ComponentFixture<MyContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyContactsComponent],
      imports: [
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        NavbarAuthenticatedModule,
        InputModule,
        RouterTestingModule,
        FormFieldModule,
        ReactiveFormsModule,
        TextAreaModule,
        BaseModalModule,
      ],
      providers: [
        {
          provide: TokenService,
          useValue: {
            getWalletAddress: () => {
              return of('0x074AB6184f46a6Caf2CA82E0d9052d356e464AEe');
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
