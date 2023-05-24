import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailConfirmModalComponent } from './email-confirm-modal.component';
import { By } from '@angular/platform-browser';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { InputModule } from '../../../../shared/input/input.module';

describe('EmailConfirmModalComponent', () => {
  let component: EmailConfirmModalComponent;
  let fixture: ComponentFixture<EmailConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmModalComponent],
      imports: [ButtonPrimaryModule, ButtonSecondaryModule, InputModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EmailConfirmModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component email confirm modal', () => {
    expect(component).toBeTruthy();
  });

  it('should call confirmEmail()', () => {
    const confirmEmail = jest.spyOn(component, 'confirmEmail');
    const confirmEmailButton = fixture.debugElement.query(
      By.css('#confirm-email')
    );
    confirmEmailButton.nativeElement.click();
    expect(confirmEmail).toHaveBeenCalledTimes(1);
  });
});
