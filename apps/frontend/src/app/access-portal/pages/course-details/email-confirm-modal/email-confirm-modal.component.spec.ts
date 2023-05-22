import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailConfirmModalComponent } from './email-confirm-modal.component';
import { SuccessModalModule } from 'apps/frontend/src/app/shared/success-modal/success-modal.module';
import { By } from '@angular/platform-browser';
import { InputModule } from 'apps/frontend/src/app/shared/input/input.module';
import { ButtonSecondaryModule } from 'apps/frontend/src/app/shared/button-secondary/button-secondary.module';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmailConfirmModalComponent', () => {
  let component: EmailConfirmModalComponent;
  let fixture: ComponentFixture<EmailConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmModalComponent],
      imports: [
        SuccessModalModule,
        InputModule,
        ButtonSecondaryModule,
        ButtonPrimaryModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
