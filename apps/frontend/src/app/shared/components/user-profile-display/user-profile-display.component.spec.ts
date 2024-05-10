import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileDisplayComponent } from './user-profile-display.component';

describe('UserProfileDisplayComponent', () => {
  let component: UserProfileDisplayComponent;
  let fixture: ComponentFixture<UserProfileDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
