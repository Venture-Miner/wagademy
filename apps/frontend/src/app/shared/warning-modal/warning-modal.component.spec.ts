import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarningModalComponent } from './warning-modal.component';
import { ButtonSecondaryModule } from '../button-secondary/button-secondary.module';
import { ButtonPrimaryModule } from '../button-primary/button-primary.module';

describe('WarningModalComponent', () => {
  let component: WarningModalComponent;
  let fixture: ComponentFixture<WarningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningModalComponent],
      imports: [ButtonSecondaryModule, ButtonPrimaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(WarningModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
