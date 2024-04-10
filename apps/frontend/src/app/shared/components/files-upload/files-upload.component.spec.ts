import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilesUploadComponent } from './files-upload.component';

describe('FilesUploadComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUploadComponent, RouterTestingModule],
    }).compileComponents();
  });
});
