import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SiteAccessService } from '../services/site-access.service';

export const siteAccessGuard: CanActivateFn = (_route, state) => {
  const siteAccess = inject(SiteAccessService);
  const router = inject(Router);

  if (siteAccess.hasValidAccessToken()) {
    return true;
  }

  return router.createUrlTree(['/passkey'], { queryParams: { returnUrl: state.url } });
};
