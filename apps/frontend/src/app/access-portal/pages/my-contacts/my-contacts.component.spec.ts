import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContactsComponent } from './my-contacts.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { InputModule } from '../../../shared/input/input.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('MyContactsComponent', () => {
  let component: MyContactsComponent;
  let fixture: ComponentFixture<MyContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyContactsComponent],
      imports: [
        ButtonPrimaryModule,
        NavbarAuthenticatedModule,
        InputModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyContactsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
