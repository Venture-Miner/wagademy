import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownProfileComponent } from './dropdown-profile.component';

jest.mock('ethers');

describe('DropdownProfileComponent', () => {
  let component: DropdownProfileComponent;
  let fixture: ComponentFixture<DropdownProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownProfileComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DropdownProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
