import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { SiteAccessService } from '../services/site-access.service';

export const siteAccessInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(SiteAccessService).getValidAccessToken();

  if (!token) return next(req);

  return next(req.clone({
    setHeaders: { 'X-Site-Access-Token': token },
  }));
};
