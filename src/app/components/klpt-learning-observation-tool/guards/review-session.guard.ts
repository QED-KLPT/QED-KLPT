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
    return router.parseUrl('/learning-observation-tool/sessions');
  }

  const session = sessionManagement.getSession(sessionId);

  if (!session) {
    return router.parseUrl('/learning-observation-tool/sessions');
  }

  if (!hasSelectedElements(session)) {
    return router.parseUrl(`/learning-observation-tool/select-domains/${sessionId}`);
  }

  // Skip validation when returning from external PDF — domainData may not be loaded yet.
  const pdfReturnBypass = sessionStorage.getItem('_klptPdfReturnBypass');

  if (pdfReturnBypass) {
    sessionStorage.removeItem('_klptPdfReturnBypass');
    return true;
  }

  if (!hasSelectedBehaviours(session, domainData)) {
    return router.parseUrl(`/learning-observation-tool/select-behaviours/${sessionId}`);
  }

  return true;
};
