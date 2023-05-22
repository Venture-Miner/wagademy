import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProfileComponent } from './create-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarModule } from '../../../shared/navbar/navbar.module';

jest.mock('ethers');

describe('CreateProfileComponent', () => {
  let component: CreateProfileComponent;
  let fixture: ComponentFixture<CreateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProfileComponent],
      imports: [HttpClientTestingModule, NavbarModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
