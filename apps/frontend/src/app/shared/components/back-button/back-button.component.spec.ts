import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonComponent, RouterTestingModule],
    }).compileComponents();
  });
});
