import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsInfoComponent } from './course-details-info.component';

describe('CourseDetailsInfoComponent', () => {
  let component: CourseDetailsInfoComponent;
  let fixture: ComponentFixture<CourseDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
