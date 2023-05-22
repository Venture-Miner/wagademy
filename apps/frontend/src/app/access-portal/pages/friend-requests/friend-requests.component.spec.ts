import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendRequestsComponent } from './friend-requests.component';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('FriendRequestsComponent', () => {
  let component: FriendRequestsComponent;
  let fixture: ComponentFixture<FriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendRequestsComponent],
      imports: [NavbarAuthenticatedModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(FriendRequestsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
