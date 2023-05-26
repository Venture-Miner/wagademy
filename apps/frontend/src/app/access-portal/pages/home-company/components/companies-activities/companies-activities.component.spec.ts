import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesActiviesComponent } from './companies-activities.component';

describe('CompaniesActiviesComponent', () => {
  let component: CompaniesActiviesComponent;
  let fixture: ComponentFixture<CompaniesActiviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesActiviesComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CompaniesActiviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
