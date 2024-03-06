import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CropperComponent } from './cropper.component';

describe('CropperComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropperComponent, RouterTestingModule],
    }).compileComponents();
  });
});
