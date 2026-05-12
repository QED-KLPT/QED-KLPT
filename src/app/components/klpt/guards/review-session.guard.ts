import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionManagementService } from '../components/shared/session-management.service';

export const reviewSessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionManagement = inject(SessionManagementService);

  const sessionId = route.paramMap.get('sessionId');

  if (!sessionId) {
    return router.parseUrl('/klpt/list-sessions');
  }

  const session = sessionManagement.getSession(sessionId);

  if (!session) {
    return router.parseUrl('/klpt/list-sessions');
  }

  const hasDomains = session.domain !== '' && session.elements.length > 0;
  const hasBehaviours = session.elements.length > 0 && session.elements.every((e) => e.behaviourId !== undefined);

  if (!hasDomains) {
    return router.parseUrl(`/klpt/select-domains/${sessionId}`);
  }

  if (!hasBehaviours) {
    return router.parseUrl(`/klpt/select-behaviours/${sessionId}`);
  }

  return true;
};
