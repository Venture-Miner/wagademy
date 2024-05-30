import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildTrainingDataComponent } from './build-training-data.component';

describe('BuildTrainingDataComponent', () => {
  let component: BuildTrainingDataComponent;
  let fixture: ComponentFixture<BuildTrainingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildTrainingDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildTrainingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
