import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateModalComponent } from './certificate-modal.component';

describe('CertificateModalComponent', () => {
  let component: CertificateModalComponent;
  let fixture: ComponentFixture<CertificateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateModalComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CertificateModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});