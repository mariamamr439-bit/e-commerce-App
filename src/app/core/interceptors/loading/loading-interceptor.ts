import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loadingService/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);

  // ✅ optional: skip loader لبعض الـ APIs
  if (req.headers.has('skip-loader')) {
    return next(req);
  }

  // ✅ show loader
  loader.show();

  return next(req).pipe(
    finalize(() => {
      // ✅ hide loader لما الـ request يخلص (success أو error)
      loader.hide();
    })
  );
};