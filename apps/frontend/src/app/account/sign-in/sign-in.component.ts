import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fetchAuthSession, signIn } from 'aws-amplify/auth';
import { ToastService } from '../../services/toast/toast.service';
import { Hub } from 'aws-amplify/utils';

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
export class SignInComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  async ngOnInit() {
    await this.checkIfUserIsLogged();
  }

  async checkIfUserIsLogged() {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    if (idToken)
      Hub.dispatch('auth', {
        event: 'signedIn',
      });
  }

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
        Hub.dispatch('auth', {
          event: 'signedIn',
        });
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
