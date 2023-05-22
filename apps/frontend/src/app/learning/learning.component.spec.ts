import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningComponent } from './learning.component';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningComponent],
      imports: [ButtonSecondaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
