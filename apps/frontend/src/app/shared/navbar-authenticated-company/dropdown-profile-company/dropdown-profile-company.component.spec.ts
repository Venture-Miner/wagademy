import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownProfileCompanyComponent } from './dropdown-profile-company.component';

jest.mock('ethers');

describe('DropdownProfileCompanyComponent', () => {
  let component: DropdownProfileCompanyComponent;
  let fixture: ComponentFixture<DropdownProfileCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownProfileCompanyComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DropdownProfileCompanyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
