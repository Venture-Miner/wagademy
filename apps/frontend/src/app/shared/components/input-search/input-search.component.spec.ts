import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputSearchComponent } from './input-search.component';

describe('InputSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchComponent, RouterTestingModule],
    }).compileComponents();
  });
});
