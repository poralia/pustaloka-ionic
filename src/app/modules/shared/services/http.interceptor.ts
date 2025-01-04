import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, from, lastValueFrom, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  req = req.clone({
    url: `${environment.restEndpoint}/${req.url}`,
  });

  return from(setToken(req, next))
    .pipe(
      catchError((error: any) => {
        const code = error?.error?.code;

        if (code === 'jwt_auth_invalid_token') {
          router.navigate(['/auth/login'], { replaceUrl: true });
        }

        return throwError(() => error);
      })
    )
};

const setToken = async (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const auth = await authService.getAuth();
  let token = null;

  if (auth) token = auth.token;

  // set token bearer if request coming from this urls
  const urls = [
    'wp/v2/books', 
    'wp/v2/challenges', 
    'wp/v2/readings',
    'wp/v2/media',
    'wp/v2/users/me',
    'buddypress/v1/activity',
    'buddypress/v1/members',
    'buddypress/v1/members/me',
    'buddypress/v1/friends',
  ];
  for (let url of urls) {
    if (req.url.includes(url) && token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      // if (url !== 'wp/v2/media') {
      //   req = req.clone({
      //     body: {
      //       ...req.body,
      //       status: 'publish',
      //     }
      //   });
      // }

      break;
    }
  }

  return lastValueFrom(next(req));
}
