import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCertificatesComponent } from './my-certificates.component';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { CertificatesCardComponent } from './components';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('MyCertificatesComponent', () => {
  let component: MyCertificatesComponent;
  let fixture: ComponentFixture<MyCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCertificatesComponent, CertificatesCardComponent],
      imports: [
        NavbarModule,
        InputModule,
        InputSelectModule,
        NavbarAuthenticatedModule,
        ButtonPrimaryModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyCertificatesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
