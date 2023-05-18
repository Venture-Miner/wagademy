import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesTogglerComponent } from './resumes-toggler.component';

describe('ResumesTogglerComponent', () => {
  let component: ResumesTogglerComponent;
  let fixture: ComponentFixture<ResumesTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumesTogglerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumesTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
