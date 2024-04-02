import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { fetchAuthSession } from 'aws-amplify/auth';
import { from, switchMap } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return from(fetchAuthSession()).pipe(
    switchMap((session) => {
      const idToken = session.tokens?.idToken?.toString();
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return next(cloned);
    })
  );
};
