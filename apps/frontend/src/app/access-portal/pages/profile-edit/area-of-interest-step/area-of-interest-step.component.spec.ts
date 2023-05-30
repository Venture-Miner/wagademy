import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfInterestEditStepComponent } from './area-of-interest-step.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../../shared/input/input.module';

describe('AreaOfInterestEditStepComponent', () => {
  let component: AreaOfInterestEditStepComponent;
  let fixture: ComponentFixture<AreaOfInterestEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfInterestEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfInterestEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
