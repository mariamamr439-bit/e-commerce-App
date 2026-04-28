import { platform } from 'os';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem('freshToken');
    if (token) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  }
  else{
    return true;
  }
};
