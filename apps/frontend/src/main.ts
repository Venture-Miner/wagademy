import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import { environment } from './environments/environment.development';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

declare global {
  interface Window {
    filesUpload: HTMLFormElement;
  }
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: environment.userPoolId,
      userPoolClientId: environment.userPoolClientId,
    },
  },
});
