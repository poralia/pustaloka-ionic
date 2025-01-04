import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const authenticated = await authService.isAuthenticated();

  if (authenticated) return true;
  
  router.navigate(['/auth/login']);
  return false;
};
