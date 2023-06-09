import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCompanyProfileComponent } from './create-company-profile.component';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';

jest.mock('ethers');

describe('CreateCompanyProfileComponent', () => {
  let component: CreateCompanyProfileComponent;
  let fixture: ComponentFixture<CreateCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCompanyProfileComponent],
      imports: [NavbarModule, HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateCompanyProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
