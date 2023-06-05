import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesActivitiesComponent } from './companies-activities.component';

describe('CompaniesActivitiesComponent', () => {
  let component: CompaniesActivitiesComponent;
  let fixture: ComponentFixture<CompaniesActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesActivitiesComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CompaniesActivitiesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
