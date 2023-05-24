import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyProfileStepComponent } from './company-profile-step.component';
import { FormFieldModule } from '../../../../shared/form-field/form-field.module';
import { InputModule } from '../../../../shared/input/input.module';
import { TextAreaModule } from '../../../../shared/text-area/text-area.module';

describe('CompanyProfileStepComponent', () => {
  let component: CompanyProfileStepComponent;
  let fixture: ComponentFixture<CompanyProfileStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileStepComponent],
      imports: [FormFieldModule, InputModule, TextAreaModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CompanyProfileStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
