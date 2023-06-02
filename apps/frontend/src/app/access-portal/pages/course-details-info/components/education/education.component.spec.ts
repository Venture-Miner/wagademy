import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherEducationComponent } from './education.component';

describe('TeacherEducationComponent', () => {
  let component: TeacherEducationComponent;
  let fixture: ComponentFixture<TeacherEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherEducationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TeacherEducationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
