import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../iam/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  console.log('[Interceptor] Request to:', req.url);
  console.log('[Interceptor] Token present:', !!token);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('[Interceptor] Error:', error.status, error.message);
        if (error.status === 401) {
          console.log('[Interceptor] 401 Unauthorized - clearing session');
          authService.signOut();
          router.navigate(['/sign-in']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
