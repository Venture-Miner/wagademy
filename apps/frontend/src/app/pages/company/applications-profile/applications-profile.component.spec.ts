import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsProfileComponent } from './applications-profile.component';

describe('ApplicationsProfileComponent', () => {
  let component: ApplicationsProfileComponent;
  let fixture: ComponentFixture<ApplicationsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
