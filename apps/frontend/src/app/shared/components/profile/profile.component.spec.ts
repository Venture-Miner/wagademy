import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterTestingModule],
    }).compileComponents();
  });
});
