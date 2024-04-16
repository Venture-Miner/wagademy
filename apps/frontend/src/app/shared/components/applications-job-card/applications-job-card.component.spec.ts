import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsJobCardComponent } from './applications-job-card.component';

describe('ApplicationsJobCardComponent', () => {
  let component: ApplicationsJobCardComponent;
  let fixture: ComponentFixture<ApplicationsJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ApplicationsJobCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ApplicationsJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
