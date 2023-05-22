import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificatesCardComponent } from './certificates-card.component';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';

describe('CertificatesCardComponent', () => {
  let component: CertificatesCardComponent;
  let fixture: ComponentFixture<CertificatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesCardComponent],
      imports: [ButtonPrimaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CertificatesCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
