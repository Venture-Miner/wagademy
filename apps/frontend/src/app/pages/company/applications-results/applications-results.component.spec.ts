import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsResultsComponent } from './applications-results.component';

describe('ApplicationsResultsComponent', () => {
  let component: ApplicationsResultsComponent;
  let fixture: ComponentFixture<ApplicationsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
