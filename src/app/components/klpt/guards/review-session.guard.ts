import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionManagementService } from '../components/shared/session-management.service';
import { KlptDomainDataService } from '../components/shared/klpt-domain-data.service';
import { hasSelectedBehaviours, hasSelectedElements } from '../components/shared/session-readiness';

export const reviewSessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionManagement = inject(SessionManagementService);
  const domainData = inject(KlptDomainDataService);

  const sessionId = route.paramMap.get('sessionId');

  if (!sessionId) {
    return router.parseUrl('/klpt/sessions');
  }

  const session = sessionManagement.getSession(sessionId);

  if (!session) {
    return router.parseUrl('/klpt/sessions');
  }

  if (!hasSelectedElements(session)) {
    return router.parseUrl(`/klpt/select-domains/${sessionId}`);
  }

  if (!hasSelectedBehaviours(session, domainData)) {
    return router.parseUrl(`/klpt/select-behaviours/${sessionId}`);
  }

  return true;
};
