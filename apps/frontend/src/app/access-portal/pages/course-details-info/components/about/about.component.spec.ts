import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutCourseComponent } from './about.component';

jest.mock('ethers');

describe('AboutCourseComponent', () => {
  let component: AboutCourseComponent;
  let fixture: ComponentFixture<AboutCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutCourseComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AboutCourseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
