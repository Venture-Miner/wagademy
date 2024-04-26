import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent, RouterTestingModule],
    }).compileComponents();
  });
});
