import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Observable, of, scan, takeWhile, timer } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { passwordComplexityValidator } from '../../shared/utils/password-complexity-validator';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import {
  autoSignIn,
  confirmSignUp,
  resendSignUpCode,
  signUp,
} from 'aws-amplify/auth';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { passwordMatchValidator } from '../../shared/utils/password-match-validator';
import { FilesUploadComponent } from '../../shared/components/files-upload/files-upload.component';
import { FilesUploadDirective } from '../../shared/components/files-upload/directives/files-upload.directive';
import { DropZoneDirective } from '../../shared/components/files-upload/directives/drop-zone.directive';
import { Hub } from 'aws-amplify/utils';
import { AccountTypeEnum } from '@wagademy/types';

type UserType = 'Company' | 'Personal';

@Component({
  selector: 'wagademy-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    ToastComponent,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    NgClass,
    InputComponent,
    FormFieldComponent,
    FilesUploadComponent,
    FilesUploadDirective,
    DropZoneDirective,
  ],
  providers: [FilesUploadDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  otpExpiryTime = 2 * 60 * 1000;
  otpRetryTime$: Observable<number> = of(0);
  codeLength = 6;
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordComplexityValidator]],
      confirmPassword: [''],
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') }
  );
  code = new FormControl(null, [Validators.minLength(this.codeLength)]);
  isResendingCode = false;
  isSigningUp = false;
  isConfirmingSignUp = false;
  step: 1 | 2 = 1;
  userType: UserType = 'Personal';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  signUp() {
    if (
      !this.form.value.email ||
      !this.form.value.password ||
      !this.form.value.name
    )
      return console.error('Email, password and name are required');
    this.isSigningUp = true;
    signUp({
      username: this.form.value.email,
      password: this.form.value.password,
      options: {
        userAttributes: {
          nickname: this.form.value.name,
          email: this.form.value.email,
        },
        autoSignIn: true,
      },
    })
      .then(async ({ nextStep }) => {
        if (nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
          await autoSignIn();
          Hub.dispatch('custom', {
            event: 'signedUp',
            data: {
              userType:
                this.userType === 'Company'
                  ? AccountTypeEnum.COMPANY
                  : AccountTypeEnum.PHYSICAL_PERSON,
              name: this.form.value.name,
            },
          });
          this.toastService.showToast({
            message: 'Account created successfully',
            type: 'success',
          });
        }
        // this.step = 2;
      })
      .catch((error) => {
        this.toastService.showToast({
          message: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        this.isSigningUp = false;
      });
  }

  confirmSignUp() {
    if (!this.form.value.email || !this.code.value)
      return console.error('Email and code are required');
    this.isConfirmingSignUp = true;
    confirmSignUp({
      username: this.form.value.email,
      confirmationCode: this.code.value,
    })
      .then(() => {
        this.router.navigate(['/account/sign-in']);
        this.toastService.showToast({
          message: 'Account created successfully',
          type: 'success',
        });
      })
      .catch((error) => {
        this.toastService.showToast({
          message: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        this.isConfirmingSignUp = false;
      });
  }

  setOtpTimer() {
    this.otpRetryTime$ = timer(0, 1000).pipe(
      scan((ticks) => ticks - 1000, this.otpExpiryTime),
      takeWhile((v) => v >= 0)
    );
  }

  resendCode() {
    if (!this.form.value.email) return console.error('Email is required');
    this.isResendingCode = true;
    resendSignUpCode({
      username: this.form.value.email,
    })
      .then((output) => {
        const deliveryMedium = output.deliveryMedium;
        this.toastService.showToast({
          message: 'Code sent via ' + deliveryMedium?.toLowerCase(),
          type: 'success',
        });
        this.setOtpTimer();
      })
      .catch((error) => {
        this.toastService.showToast({
          message: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        this.isResendingCode = false;
      });
  }
}
