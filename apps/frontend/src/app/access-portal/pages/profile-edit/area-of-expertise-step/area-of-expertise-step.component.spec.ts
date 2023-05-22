import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaOfExpertiseEditStepComponent } from './area-of-expertise-step.component';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';
import { InputModule } from 'apps/frontend/src/app/shared/input/input.module';

describe('AreaOfExpertiseEditStepComponent', () => {
  let component: AreaOfExpertiseEditStepComponent;
  let fixture: ComponentFixture<AreaOfExpertiseEditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaOfExpertiseEditStepComponent],
      imports: [ButtonPrimaryModule, InputModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AreaOfExpertiseEditStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
