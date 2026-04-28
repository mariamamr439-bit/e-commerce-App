import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem('freshToken');
    if (token) {
      if (
        req.url.includes('cart') ||
        req.url.includes('wishlist') ||
        req.url.includes('orders') ||
        req.url.includes('reviews')
      ) {
        req = req.clone({
          setHeaders: {
            token: token,
          },
        });
      }
    }
  }

  return next(req);
};
