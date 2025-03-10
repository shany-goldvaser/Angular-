import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserService);
  const router = inject(Router);
  if (loginService.isEnter === false) {
    router.navigate(['/'])
    return false;
  }
  return true;
};
