import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileViewAndEditComponent } from './profile-view-and-edit.component';

describe('ProfileViewAndEditComponent', () => {
  let component: ProfileViewAndEditComponent;
  let fixture: ComponentFixture<ProfileViewAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileViewAndEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileViewAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
