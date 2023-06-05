import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendRequestsComponent } from './friend-requests.component';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';

jest.mock('ethers');

describe('FriendRequestsComponent', () => {
  let component: FriendRequestsComponent;
  let fixture: ComponentFixture<FriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendRequestsComponent],
      imports: [
        NavbarAuthenticatedModule,
        RouterTestingModule,
        ButtonSecondaryModule,
        ButtonPrimaryModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component friend request', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "home"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-home'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home');
  });

  it('should display a list of requests', () => {
    const requestsList = fixture.debugElement.queryAll(By.css('#request-list'));
    expect(requestsList.length).toBe(4);
  });

  it('should display a list of interests', () => {
    const interestList = fixture.debugElement.queryAll(
      By.css('#interest-list')
    );
    expect(interestList.length).toBe(40);
  });

  it('should call accept()', () => {
    const accept = jest.spyOn(component, 'accept');
    const acceptButton = fixture.debugElement.query(By.css('#accept-button'));
    acceptButton.nativeElement.click();
    expect(accept).toHaveBeenCalledTimes(1);
  });
});
