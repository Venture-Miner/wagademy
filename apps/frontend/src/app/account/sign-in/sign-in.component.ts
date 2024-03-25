import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { signIn } from 'aws-amplify/auth';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
  ],
  selector: 'wagademy-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  signIn() {
    if (!this.form.value.email || !this.form.value.password)
      return console.error('Email and password are required');
    this.isLoading = true;
    signIn({
      username: this.form.value.email,
      password: this.form.value.password,
    })
      .then(({ nextStep }) => {
        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
          this.toastService.showToast({
            message: 'Please sign up again to confirm your account',
            type: 'error',
          });
        }
      })
      .catch((error) => {
        this.toastService.showToast({
          message: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
