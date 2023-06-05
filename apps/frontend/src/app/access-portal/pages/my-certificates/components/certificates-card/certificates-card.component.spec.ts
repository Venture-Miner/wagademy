import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificatesCardComponent } from './certificates-card.component';
import { ButtonPrimaryModule } from '../../../../../shared/button-primary/button-primary.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('CertificatesCardComponent', () => {
  let component: CertificatesCardComponent;
  let fixture: ComponentFixture<CertificatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesCardComponent],
      imports: [ButtonPrimaryModule, HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CertificatesCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
